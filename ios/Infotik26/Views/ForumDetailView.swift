/* Hallmark · ios-view: ForumDetailView.swift · theme: SwiftUI-Native */
import SwiftUI

struct ForumDetailView: View {
    let threadId: String
    
    @EnvironmentObject var network: NetworkManager
    @Environment(\.presentationMode) var presentationMode
    
    @State private var replyText = ""
    @State private var isEditing = false
    
    @State private var editTitle = ""
    @State private var editCategory = ""
    @State private var editContent = ""

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            if let thread = network.forumThreads.first(where: { $0.id == threadId }) {
                VStack(spacing: 0) {
                    
                    // Admin moderation header banner
                    if network.currentUser?.role == "admin" {
                        HStack {
                            Image(systemName: "shield.lefthalf.filled")
                                .foregroundColor(.purple)
                            Text("Mode Moderasi Admin Aktif")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(.purple)
                            Spacer()
                        }
                        .padding(.horizontal)
                        .padding(.vertical, 8)
                        .background(Color.purple.opacity(0.1))
                        .border(Color.purple.opacity(0.2), width: 1)
                    }
                    
                    ScrollView {
                        VStack(alignment: .leading, spacing: 16) {
                            
                            // Post Header
                            HStack {
                                Image(systemName: "person.crop.square.fill")
                                    .font(.title)
                                    .foregroundColor(.indigo)
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(thread.author)
                                        .font(.subheadline)
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                    Text("NIM: \(thread.nim) • \(thread.date)")
                                        .font(.system(size: 9, design: .monospaced))
                                        .foregroundColor(.gray)
                                }
                                
                                Spacer()
                                
                                Text(thread.category)
                                    .font(.system(size: 8, weight: .bold))
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 3)
                                    .background(Color.white.opacity(0.1))
                                    .foregroundColor(.white)
                                    .cornerRadius(6)
                            }
                            
                            // Content
                            Text(thread.title)
                                .font(.title3)
                                .fontWeight(.black)
                                .foregroundColor(.white)
                            
                            Text(thread.content)
                                .font(.subheadline)
                                .foregroundColor(.white.opacity(0.85))
                                .lineSpacing(4)
                            
                            // Aksi bar (Upvotes & Admin buttons)
                            HStack(spacing: 20) {
                                Button(action: {
                                    Task {
                                        await network.upvoteThread(threadId: thread.id)
                                    }
                                }) {
                                    Label("\(thread.upvotes) Upvotes", systemImage: "hand.thumbsup.fill")
                                        .font(.caption)
                                        .foregroundColor(.indigo)
                                }
                                
                                Spacer()
                                
                                if network.currentUser?.role == "admin" {
                                    Button(action: {
                                        editTitle = thread.title
                                        editCategory = thread.category
                                        editContent = thread.content
                                        isEditing = true
                                    }) {
                                        Label("Ubah", systemImage: "pencil")
                                            .font(.caption)
                                            .foregroundColor(.purple)
                                    }
                                    
                                    Button(action: {
                                        let confirm = deleteConfirm {
                                            Task {
                                                let success = await network.deleteThread(threadId: thread.id)
                                                if success {
                                                    presentationMode.wrappedValue.dismiss()
                                                }
                                            }
                                        }
                                    }) {
                                        Label("Hapus", systemImage: "trash")
                                            .font(.caption)
                                            .foregroundColor(.red)
                                    }
                                }
                            }
                            .padding(.top, 4)
                            
                            Divider()
                                .background(Color.white.opacity(0.1))
                            
                            // Replies List
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Diskusi (\(thread.replies.count) Balasan)")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.gray)
                                    .padding(.bottom, 4)
                                
                                ForEach(Array(thread.replies.enumerated()), id: \.offset) { index, reply in
                                    VStack(alignment: .leading, spacing: 8) {
                                        HStack {
                                            Label(reply.author, systemImage: "person.circle.fill")
                                                .font(.caption)
                                                .fontWeight(.bold)
                                                .foregroundColor(.white)
                                            
                                            Spacer()
                                            
                                            Text(reply.date)
                                                .font(.system(size: 8, design: .monospaced))
                                                .foregroundColor(.gray)
                                            
                                            if network.currentUser?.role == "admin" {
                                                Button(action: {
                                                    Task {
                                                        _ = await network.deleteReply(threadId: thread.id, replyIndex: index)
                                                    }
                                                }) {
                                                    Image(systemName: "xmark.circle")
                                                        .font(.caption)
                                                        .foregroundColor(.red)
                                                }
                                            }
                                        }
                                        
                                        Text(reply.content)
                                            .font(.footnote)
                                            .foregroundColor(.white.opacity(0.8))
                                            .padding(.leading, 18)
                                    }
                                    .padding()
                                    .background(Color.white.opacity(0.03))
                                    .cornerRadius(12)
                                }
                                
                                if thread.replies.isEmpty {
                                    Text("Belum ada tanggapan.")
                                        .font(.caption)
                                        .foregroundColor(.gray)
                                        .italic()
                                        .frame(maxWidth: .infinity, alignment: .center)
                                        .padding(.vertical, 20)
                                }
                            }
                        }
                        .padding()
                    }
                    
                    // Reply bar input
                    HStack(spacing: 12) {
                        TextField("Tulis balasan...", text: $replyText)
                            .padding(10)
                            .background(Color.white.opacity(0.05))
                            .cornerRadius(10)
                            .foregroundColor(.white)
                            .font(.subheadline)
                        
                        Button(action: {
                            guard !replyText.trimmingCharacters(in: .whitespaces).isEmpty else { return }
                            Task {
                                let success = await network.addReply(threadId: thread.id, content: replyText)
                                if success {
                                    replyText = ""
                                }
                            }
                        }) {
                            Image(systemName: "paperplane.fill")
                                .foregroundColor(.black)
                                .padding(10)
                                .background(Color.white)
                                .clipShape(Circle())
                        }
                    }
                    .padding()
                    .background(Color.black.opacity(0.3))
                }
            } else {
                Text("Diskusi tidak ditemukan.")
                    .foregroundColor(.gray)
            }
        }
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $isEditing) {
            EditThreadView(isPresented: $isEditing, threadId: threadId, title: $editTitle, category: $editCategory, content: $editContent)
                .environmentObject(network)
        }
    }
    
    // Quick confirm trigger
    func deleteConfirm(action: @escaping () -> Void) {
        action() // Simplified trigger for swift mock actions
    }
}

struct EditThreadView: View {
    @Binding var isPresented: Bool
    let threadId: String
    
    @Binding var title: String
    @Binding var category: String
    @Binding var content: String
    
    @EnvironmentObject var network: NetworkManager
    @State private var isSaving = false
    
    let categories = ["Umum & Peralatan", "Info Kost", "Tugas & Coding", "Masta 2026"]

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                Form {
                    Section(header: Text("Moderasi Judul").foregroundColor(.gray)) {
                        TextField("Judul Pertanyaan", text: $title)
                            .foregroundColor(.white)
                        
                        Picker("Kategori", selection: $category) {
                            ForEach(categories, id: \.self) { cat in
                                Text(cat).tag(cat)
                            }
                        }
                    }
                    .listRowBackground(Color.white.opacity(0.05))
                    
                    Section(header: Text("Isi Diskusi").foregroundColor(.gray)) {
                        TextEditor(text: $content)
                            .frame(height: 150)
                            .foregroundColor(.white)
                    }
                    .listRowBackground(Color.white.opacity(0.05))
                }
                .background(Color.black)
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Ubah Konten")
            .navigationBarTitleDisplayMode(.inline)
            .navigationBarItems(
                leading: Button("Batal") { isPresented = false }.foregroundColor(.indigo),
                trailing: Button("Simpan") {
                    guard !title.trimmingCharacters(in: .whitespaces).isEmpty,
                          !content.trimmingCharacters(in: .whitespaces).isEmpty else { return }
                    
                    isSaving = true
                    Task {
                        let success = await network.updateThread(threadId: threadId, title: title, category: category, content: content)
                        isSaving = false
                        if success {
                            isPresented = false
                        }
                    }
                }
                .foregroundColor(.indigo)
                .disabled(isSaving)
            )
        }
        .preferredColorScheme(.dark)
    }
}
