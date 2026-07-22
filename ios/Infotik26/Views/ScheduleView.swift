/* Hallmark · ios-view: ScheduleView.swift · theme: SwiftUI-Native */
import SwiftUI

struct ScheduleView: View {
    @EnvironmentObject var network: NetworkManager
    @State private var selectedDay = "Senin"
    
    let days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Day Filter Selector Horizontal List
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(days, id: \.self) { day in
                                Button(action: {
                                    selectedDay = day
                                }) {
                                    Text(day)
                                        .font(.subheadline)
                                        .fontWeight(selectedDay == day ? .bold : .medium)
                                        .padding(.horizontal, 16)
                                        .padding(.vertical, 8)
                                        .background(selectedDay == day ? Color.white : Color.white.opacity(0.05))
                                        .foregroundColor(selectedDay == day ? Color.black : Color.white)
                                        .cornerRadius(20)
                                }
                            }
                        }
                        .padding()
                    }
                    
                    if network.isLoading && network.schedules.isEmpty {
                        Spacer()
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        Spacer()
                    } else {
                        let daySchedules = network.schedules.filter { $0.day == selectedDay }
                        
                        if daySchedules.isEmpty {
                            Spacer()
                            VStack(spacing: 12) {
                                Image(systemName: "calendar.badge.clock")
                                    .font(.system(size: 40))
                                    .foregroundColor(.gray)
                                Text("Tidak ada jadwal kuliah hari ini.")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                        } else {
                            ScrollView {
                                VStack(spacing: 14) {
                                    ForEach(daySchedules) { sch in
                                        VStack(alignment: .leading, spacing: 10) {
                                            HStack {
                                                Text(sch.time)
                                                    .font(.system(size: 11, design: .monospaced))
                                                    .foregroundColor(.indigo)
                                                    .fontWeight(.bold)
                                                
                                                Spacer()
                                                
                                                Text(sch.badge)
                                                    .font(.system(size: 9, weight: .bold))
                                                    .padding(.horizontal, 6)
                                                    .padding(.vertical, 2)
                                                    .background(Color.white.opacity(0.1))
                                                    .foregroundColor(.white)
                                                    .cornerRadius(6)
                                            }
                                            
                                            Text(sch.course)
                                                .font(.headline)
                                                .fontWeight(.black)
                                                .foregroundColor(.white)
                                            
                                            Text("Dosen: \(sch.lecturer)")
                                                .font(.caption)
                                                .foregroundColor(.gray)
                                            
                                            HStack(spacing: 12) {
                                                Label(sch.room, systemImage: "mappin.and.ellipse")
                                                Label("\(sch.sks) SKS", systemImage: "doc.text")
                                            }
                                            .font(.system(size: 10))
                                            .foregroundColor(.gray)
                                        }
                                        .padding()
                                        .background(Color.white.opacity(0.05))
                                        .cornerRadius(18)
                                    }
                                }
                                .padding()
                            }
                        }
                    }
                }
            }
            .navigationTitle("Jadwal Kuliah")
        }
    }
}
