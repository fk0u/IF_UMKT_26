/* Hallmark · ios-view: HomeView.swift · theme: SwiftUI-Native */
import SwiftUI

struct HomeView: View {
    @EnvironmentObject var network: NetworkManager

    var body: some View {
        TabView {
            // Tab 1: News Bulletin
            NewsView()
                .tabItem {
                    Label("Buletin", systemImage: "newspaper.fill")
                }
            
            // Tab 2: Class Schedule
            ScheduleView()
                .tabItem {
                    Label("Jadwal", systemImage: "calendar")
                }
            
            // Tab 3: Assignments List
            TasksView()
                .tabItem {
                    Label("Tugas", systemImage: "checklist")
                }
            
            // Tab 4: Student Profile
            ProfileView()
                .tabItem {
                    Label("Profil", systemImage: "person.crop.circle.fill")
                }
        }
        .accentColor(.indigo)
        .onAppear {
            Task {
                await network.fetchAllData()
            }
        }
    }
}
