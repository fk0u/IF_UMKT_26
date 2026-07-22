/* Hallmark · ios-app: Infotik26App.swift · theme: SwiftUI-Native */
import SwiftUI

@main
struct Infotik26App: App {
    @StateObject private var networkManager = NetworkManager()

    var body: some Scene {
        WindowGroup {
            if networkManager.currentUser != nil {
                HomeView()
                    .environmentObject(networkManager)
                    .preferredColorScheme(.dark) // Pure dark mode preference
            } else {
                LoginView()
                    .environmentObject(networkManager)
                    .preferredColorScheme(.dark)
            }
        }
    }
}
