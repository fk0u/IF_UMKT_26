/* Hallmark · ios-view: TasksView.swift · theme: SwiftUI-Native */
import SwiftUI

struct TasksView: View {
    @EnvironmentObject var network: NetworkManager

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                if network.isLoading && network.tasks.isEmpty {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                } else {
                    ScrollView {
                        VStack(spacing: 14) {
                            ForEach(network.tasks) { task in
                                HStack(spacing: 16) {
                                    // Checkbox/Status Indicator
                                    Image(systemName: task.status == "Selesai" ? "checkmark.circle.fill" : "circle")
                                        .font(.title2)
                                        .foregroundColor(task.status == "Selesai" ? .emerald : .gray)
                                    
                                    VStack(alignment: .leading, spacing: 6) {
                                        Text(task.title)
                                            .font(.subheadline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.white)
                                            .strikethrough(task.status == "Selesai", color: .gray)
                                        
                                        HStack(spacing: 8) {
                                            Text(task.course)
                                                .font(.system(size: 10))
                                                .foregroundColor(.indigo)
                                                .fontWeight(.semibold)
                                            
                                            Text("•")
                                                .foregroundColor(.gray)
                                            
                                            Text("Tenggat: \(task.deadline)")
                                                .font(.system(size: 10, design: .monospaced))
                                                .foregroundColor(.gray)
                                        }
                                    }
                                    
                                    Spacer()
                                    
                                    // Priority Badge
                                    Text(task.priority)
                                        .font(.system(size: 8, weight: .black))
                                        .padding(.horizontal, 6)
                                        .padding(.vertical, 3)
                                        .background(getPriorityColor(task.priority).opacity(0.15))
                                        .foregroundColor(getPriorityColor(task.priority))
                                        .cornerRadius(6)
                                }
                                .padding()
                                .background(Color.white.opacity(0.05))
                                .cornerRadius(16)
                            }
                        }
                        .padding()
                    }
                    .refreshable {
                        await network.fetchAllData()
                    }
                }
            }
            .navigationTitle("Daftar Tugas Kuliah")
        }
    }

    func getPriorityColor(_ priority: String) -> Color {
        switch priority {
        case "Tinggi", "Sangat Tinggi":
            return .red
        case "Sedang":
            return .orange
        default:
            return .blue
        }
    }
}

// Custom Colors extension for nice UI
extension Color {
    static let emerald = Color(red: 16/255, green: 185/255, blue: 129/255)
    static let amber = Color(red: 245/255, green: 158/255, blue: 11/255)
}
