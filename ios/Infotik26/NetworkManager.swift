/* Hallmark · ios-network: NetworkManager.swift · theme: SwiftUI-Native */
import Foundation
import Combine

class NetworkManager: ObservableObject {
    @Published var currentUser: UserAccount? = nil
    @Published var news: [NewsItem] = []
    @Published var tasks: [TaskItem] = []
    @Published var schedules: [ScheduleItem] = []
    @Published var forumThreads: [ForumThread] = []
    @Published var isLoading = false
    @Published var errorMessage: String? = nil

    // Change this to your deployed Vercel URL or localhost IP (e.g., http://192.168.1.100:3001)
    private let baseURLString = "http://localhost:3001"

    init() {
        loadStoredUser()
    }

    func loadStoredUser() {
        if let data = UserDefaults.standard.data(forKey: "current_user"),
           let user = try? JSONDecoder().decode(UserAccount.self, from: data) {
            DispatchQueue.main.async {
                self.currentUser = user
            }
        }
    }

    func saveUserSession(_ user: UserAccount) {
        if let data = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(data, forKey: "current_user")
            DispatchQueue.main.async {
                self.currentUser = user
            }
        }
    }

    func clearUserSession() {
        UserDefaults.standard.removeObject(forKey: "current_user")
        DispatchQueue.main.async {
            self.currentUser = nil
            self.news = []
            self.tasks = []
            self.schedules = []
            self.forumThreads = []
        }
    }

    // AUTH ACTIONS
    func login(emailOrNim: String, passwordOrPin: String) async -> Bool {
        guard let url = URL(string: "\(baseURLString)/api/auth/login") else { return false }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["emailOrNim": emailOrNim, "password": passwordOrPin]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        DispatchQueue.main.async {
            self.isLoading = true
            self.errorMessage = nil
        }
        
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse else {
                throw URLError(.badServerResponse)
            }
            
            if httpResponse.statusCode == 200 {
                let authResponse = try JSONDecoder().decode(AuthResponse.self, from: data)
                self.saveUserSession(authResponse.user)
                DispatchQueue.main.async {
                    self.isLoading = false
                }
                return true
            } else {
                let errorObj = try? JSONSerialization.jsonObject(with: data) as? [String: String]
                let message = errorObj?["message"] ?? "Email/NIM atau password salah."
                DispatchQueue.main.async {
                    self.isLoading = false
                    self.errorMessage = message
                }
                return false
            }
        } catch {
            DispatchQueue.main.async {
                self.isLoading = false
                self.errorMessage = "Tidak dapat terhubung ke server backend."
            }
            return false
        }
    }

    // FETCH ACTIONS
    func fetchAllData() async {
        DispatchQueue.main.async {
            self.isLoading = true
        }
        
        async let fetchedNews = fetchNews()
        async let fetchedTasks = fetchTasks()
        async let fetchedSchedules = fetchSchedules()
        async let fetchedForum = fetchForum()
        
        let (n, t, s, f) = await (fetchedNews, fetchedTasks, fetchedSchedules, fetchedForum)
        
        DispatchQueue.main.async {
            self.news = n
            self.tasks = t
            self.schedules = s
            self.forumThreads = f
            self.isLoading = false
        }
    }

    private func fetchNews() async -> [NewsItem] {
        guard let url = URL(string: "\(baseURLString)/api/news") else { return [] }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            return (try? JSONDecoder().decode([NewsItem].self, from: data)) ?? []
        } catch {
            return []
        }
    }

    private func fetchTasks() async -> [TaskItem] {
        guard let url = URL(string: "\(baseURLString)/api/tasks") else { return [] }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            return (try? JSONDecoder().decode([TaskItem].self, from: data)) ?? []
        } catch {
            return []
        }
    }

    private func fetchSchedules() async -> [ScheduleItem] {
        guard let url = URL(string: "\(baseURLString)/api/schedules") else { return [] }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            return (try? JSONDecoder().decode([ScheduleItem].self, from: data)) ?? []
        } catch {
            return []
        }
    }

    func fetchForum() async -> [ForumThread] {
        guard let url = URL(string: "\(baseURLString)/api/forum") else { return [] }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            return (try? JSONDecoder().decode([ForumThread].self, from: data)) ?? []
        } catch {
            return []
        }
    }

    // FORUM ACTIONS
    func createThread(title: String, category: String, content: String) async -> Bool {
        guard let url = URL(string: "\(baseURLString)/api/forum"),
              let user = currentUser else { return false }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = [
            "title": title,
            "category": category,
            "content": content,
            "author": user.name,
            "nim": user.nim
        ]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 201 {
                await refreshForum()
                return true
            }
        } catch {}
        return false
    }

    func upvoteThread(threadId: String) async {
        guard let url = URL(string: "\(baseURLString)/api/forum/\(threadId)/upvote") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        
        do {
            let (_, _) = try await URLSession.shared.data(for: request)
            await refreshForum()
        } catch {}
    }

    func addReply(threadId: String, content: String) async -> Bool {
        guard let url = URL(string: "\(baseURLString)/api/forum/\(threadId)/replies"),
              let user = currentUser else { return false }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["author": user.name, "content": content]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                await refreshForum()
                return true
            }
        } catch {}
        return false
    }

    // ADMIN MODERATION ACTIONS
    func updateThread(threadId: String, title: String, category: String, content: String) async -> Bool {
        guard let url = URL(string: "\(baseURLString)/api/forum/\(threadId)") else { return false }
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["title": title, "category": category, "content": content]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                await refreshForum()
                return true
            }
        } catch {}
        return false
    }

    func deleteThread(threadId: String) async -> Bool {
        guard let url = URL(string: "\(baseURLString)/api/forum/\(threadId)") else { return false }
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                await refreshForum()
                return true
            }
        } catch {}
        return false
    }

    func deleteReply(threadId: String, replyIndex: Int) async -> Bool {
        guard let url = URL(string: "\(baseURLString)/api/forum/\(threadId)/replies/\(replyIndex)") else { return false }
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                await refreshForum()
                return true
            }
        } catch {}
        return false
    }

    func refreshForum() async {
        let f = await fetchForum()
        DispatchQueue.main.async {
            self.forumThreads = f
        }
    }
}
