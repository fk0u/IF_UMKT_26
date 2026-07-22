/* Hallmark · ios-model: Models.swift · theme: SwiftUI-Native */
import Foundation

struct UserAccount: Codable, Identifiable {
    let id: String
    let name: String
    let nim: String
    let whatsapp: String
    let email: String
    let role: String
    let avatar: String
}

struct NewsItem: Codable, Identifiable {
    let id: String
    let title: String
    let date: String
    let category: String
    let author: String
    let pinned: Bool
    let summary: String
    let content: String
}

struct TaskItem: Codable, Identifiable {
    let id: String
    let title: String
    let course: String
    let deadline: String
    let priority: String
    let status: String
    let description: String?
}

struct ScheduleItem: Codable, Identifiable {
    let id: String
    let day: String
    let dayCode: Int
    let time: String
    let startTime: String
    let endTime: String
    let course: String
    let lecturer: String
    let room: String
    let building: String
    let sks: Int
    let badge: String
    let color: String
}

struct ForumReply: Codable, Hashable {
    let author: String
    let avatar: String
    let date: String
    let content: String
}

struct ForumThread: Codable, Identifiable {
    let id: String
    let author: String
    let nim: String
    let avatar: String
    let title: String
    let category: String
    let content: String
    let date: String
    let upvotes: Int
    let replies: [ForumReply]
}

struct AuthResponse: Codable {
    let user: UserAccount
}
