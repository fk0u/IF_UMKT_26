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

struct AuthResponse: Codable {
    let user: UserAccount
}
