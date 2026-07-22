/* Hallmark · ios-view: LoginView.swift · theme: SwiftUI-Native */
import SwiftUI

struct LoginView: View {
    @EnvironmentObject var network: NetworkManager
    @State private var emailOrNim = ""
    @State private var password = ""
    @State private var showingAlert = false
    @State private var nimValidationError = false

    var body: some View {
        ZStack {
            // Background mesh/gradient
            Color.black.ignoresSafeArea()
            
            VStack(spacing: 24) {
                Spacer()
                
                // Brand Header Logo
                VStack(spacing: 12) {
                    Image(systemName: "terminal.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.indigo)
                        .padding()
                        .background(Color.indigo.opacity(0.15))
                        .clipShape(RoundedRectangle(cornerRadius: 20))
                    
                    Text("INFOTIK 26")
                        .font(.system(.title, design: .rounded))
                        .fontWeight(.black)
                        .foregroundColor(.white)
                    
                    Text("Pusat Informasi Mahasiswa TI 2026")
                        .font(.footnote)
                        .foregroundColor(.gray)
                }
                .padding(.bottom, 20)
                
                // Form Card Layout
                VStack(spacing: 16) {
                    TextField("Email atau NIM", text: $emailOrNim)
                        .padding()
                        .background(Color.white.opacity(0.05))
                        .cornerRadius(12)
                        .foregroundColor(.white)
                        .autocapitalization(.none)
                        .disableAutocorrection(true)
                        .font(.system(.subheadline, design: .monospaced))
                    
                    SecureField("Password", text: $password)
                        .padding()
                        .background(Color.white.opacity(0.05))
                        .cornerRadius(12)
                        .foregroundColor(.white)
                        .font(.system(.subheadline, design: .monospaced))
                }
                .padding(.horizontal)
                
                if let error = network.errorMessage {
                    Text(error)
                        .font(.caption)
                        .foregroundColor(.red)
                        .padding(.horizontal)
                }
                
                // Login action button
                Button(action: {
                    Task {
                        // NIM prefix check for student log ins
                        if !emailOrNim.contains("@") && !emailOrNim.starts(with: "26") {
                            nimValidationError = true
                            showingAlert = true
                            return
                        }
                        
                        let success = await network.login(emailOrNim: emailOrNim, passwordOrPin: password)
                        if !success {
                            showingAlert = true
                        }
                    }
                }) {
                    HStack {
                        if network.isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .black))
                        } else {
                            Text("Masuk Akun")
                                .fontWeight(.bold)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.white)
                    .foregroundColor(.black)
                    .cornerRadius(14)
                }
                .padding(.horizontal)
                .disabled(network.isLoading)
                
                Spacer()
                
                Text("Hanya Mahasiswa Angkatan 2026 yang diperbolehkan masuk.")
                    .font(.system(size: 10))
                    .foregroundColor(.gray)
                    .padding(.bottom)
            }
            .padding()
        }
        .alert(isPresented: $showingAlert) {
            if nimValidationError {
                return Alert(
                    title: Text("NIM Tidak Valid"),
                    message: Text("Akses ditolak. NIM mahasiswa Teknik Informatika angkatan 2026 wajib diawali dengan angka 26."),
                    dismissButton: .default(Text("Mengerti")) {
                        nimValidationError = false
                    }
                )
            } else {
                return Alert(
                    title: Text("Autentikasi Gagal"),
                    message: Text(network.errorMessage ?? "Gagal terhubung ke database. Harap cek kembali password atau jaringan Anda."),
                    dismissButton: .default(Text("Coba Lagi"))
                )
            }
        }
    }
}
