/* Hallmark · ios-network: NetworkManager.swift · theme: SwiftUI-Native */
import Foundation
import Combine

class NetworkManager: ObservableObject {
    @Published var currentUser: UserAccount? = nil
    @Published var news: [NewsItem] = []
    @Published var tasks: [TaskItem] = []
    @Published var schedules: [ScheduleItem] = []
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
        
        let (n, t, s) = await (fetchedNews, fetchedTasks, fetchedSchedules)
        
        DispatchQueue.main.async {
            self.news = n
            self.tasks = t
            self.schedules = s
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
}
