/* Hallmark · ios-view: ProfileView.swift · theme: SwiftUI-Native */
import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var network: NetworkManager

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                if let user = network.currentUser {
                    VStack(spacing: 24) {
                        // User Avatar & Name Card
                        VStack(spacing: 12) {
                            // Simple placeholder avatar fallback
                            Image(systemName: "person.crop.circle.badge.checkmark")
                                .font(.system(size: 70))
                                .foregroundColor(.indigo)
                                .padding()
                                .background(Color.indigo.opacity(0.15))
                                .clipShape(Circle())
                            
                            Text(user.name)
                                .font(.title3)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            
                            Text("NIM: \(user.nim)")
                                .font(.system(.subheadline, design: .monospaced))
                                .foregroundColor(.gray)
                        }
                        .padding(.top, 40)
                        
                        // Detail Fields List
                        VStack(spacing: 1) {
                            ProfileRow(label: "Nomor WhatsApp", value: user.whatsapp)
                            ProfileRow(label: "Alamat Email", value: user.email)
                            ProfileRow(label: "Hak Akses/Peran", value: user.role.uppercased())
                        }
                        .background(Color.white.opacity(0.05))
                        .cornerRadius(16)
                        .padding(.horizontal)
                        
                        Spacer()
                        
                        // Log Out button
                        Button(action: {
                            network.clearUserSession()
                        }) {
                            Text("Keluar dari Akun")
                                .fontWeight(.bold)
                                .foregroundColor(.red)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.red.opacity(0.1))
                                .cornerRadius(14)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 14)
                                        .stroke(Color.red.opacity(0.3), lineWidth: 1)
                                )
                        }
                        .padding(.horizontal)
                        .padding(.bottom, 30)
                    }
                } else {
                    Text("Sesi pengguna telah berakhir.")
                        .foregroundColor(.gray)
                }
            }
            .navigationTitle("Profil Mahasiswa")
        }
    }
}

struct ProfileRow: View {
    let label: String
    let value: String

    var body: some View {
        HStack {
            Text(label)
                .foregroundColor(.gray)
            Spacer()
            Text(value)
                .foregroundColor(.white)
                .font(.system(.subheadline, design: .rounded))
                .fontWeight(.semibold)
        }
        .padding()
        .background(Color.black.opacity(0.1))
    }
}
