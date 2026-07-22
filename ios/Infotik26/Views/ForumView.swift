/* Hallmark · ios-view: ForumView.swift · theme: SwiftUI-Native */
import SwiftUI

struct ForumView: View {
    @EnvironmentObject var network: NetworkManager
    @State private var selectedCategory = "Semua"
    @State private var showingCreateSheet = false
    
    let categories = ["Semua", "Umum & Peralatan", "Info Kost", "Tugas & Coding", "Masta 2026"]

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Category Filter list
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(categories, id: \.self) { cat in
                                Button(action: {
                                    selectedCategory = cat
                                }) {
                                    Text(cat)
                                        .font(.system(size: 11, weight: .bold))
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 8)
                                        .background(selectedCategory == cat ? Color.white : Color.white.opacity(0.05))
                                        .foregroundColor(selectedCategory == cat ? Color.black : Color.white)
                                        .cornerRadius(18)
                                }
                            }
                        }
                        .padding()
                    }
                    
                    if network.isLoading && network.forumThreads.isEmpty {
                        Spacer()
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        Spacer()
                    } else {
                        let filteredThreads = network.forumThreads.filter {
                            selectedCategory == "Semua" || $0.category == selectedCategory
                        }
                        
                        if filteredThreads.isEmpty {
                            Spacer()
                            VStack(spacing: 12) {
                                Image(systemName: "bubble.left.and.bubble.right")
                                    .font(.system(size: 40))
                                    .foregroundColor(.gray)
                                Text("Belum ada diskusi di kategori ini.")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                        } else {
                            ScrollView {
                                LazyVStack(spacing: 14) {
                                    ForEach(filteredThreads) { thread in
                                        NavigationLink(destination: ForumDetailView(threadId: thread.id)) {
                                            VStack(alignment: .leading, spacing: 10) {
                                                HStack {
                                                    Text(thread.category)
                                                        .font(.system(size: 8, weight: .black))
                                                        .padding(.horizontal, 6)
                                                        .padding(.vertical, 2)
                                                        .background(Color.indigo.opacity(0.15))
                                                        .foregroundColor(.indigo)
                                                        .cornerRadius(6)
                                                    
                                                    Spacer()
                                                    
                                                    Text(thread.date)
                                                        .font(.system(size: 9, design: .monospaced))
                                                        .foregroundColor(.gray)
                                                }
                                                
                                                Text(thread.title)
                                                    .font(.subheadline)
                                                    .fontWeight(.bold)
                                                    .foregroundColor(.white)
                                                    .multilineTextAlignment(.leading)
                                                
                                                Text(thread.content)
                                                    .font(.caption)
                                                    .foregroundColor(.gray)
                                                    .multilineTextAlignment(.leading)
                                                    .lineLimit(2)
                                                
                                                HStack(spacing: 16) {
                                                    Label("\(thread.upvotes)", systemImage: "hand.thumbsup.fill")
                                                    Label("\(thread.replies.count)", systemImage: "bubble.left.fill")
                                                    
                                                    Spacer()
                                                    
                                                    Text(thread.author)
                                                        .font(.system(size: 9, weight: .semibold))
                                                        .foregroundColor(.gray)
                                                }
                                                .font(.system(size: 10))
                                                .foregroundColor(.gray)
                                                .padding(.top, 4)
                                            }
                                            .padding()
                                            .background(Color.white.opacity(0.05))
                                            .cornerRadius(18)
                                        }
                                    }
                                }
                                .padding(.horizontal)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Diskusi Forum")
            .navigationBarItems(trailing: 
                Button(action: {
                    showingCreateSheet = true
                }) {
                    Image(systemName: "plus.bubble.fill")
                        .font(.title3)
                        .foregroundColor(.indigo)
                }
            )
            .sheet(isPresented: $showingCreateSheet) {
                CreateThreadView(isPresented: $showingCreateSheet)
                    .environmentObject(network)
            }
        }
    }
}

struct CreateThreadView: View {
    @Binding var isPresented: Bool
    @EnvironmentObject var network: NetworkManager
    
    @State private var title = ""
    @State private var category = "Umum & Peralatan"
    @State private var content = ""
    @State private var isSubmitting = false
    
    let categories = ["Umum & Peralatan", "Info Kost", "Tugas & Coding", "Masta 2026"]

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                Form {
                    Section(header: Text("Detail Diskusi").foregroundColor(.gray)) {
                        TextField("Judul Pertanyaan", text: $title)
                            .foregroundColor(.white)
                        
                        Picker("Kategori", selection: $category) {
                            ForEach(categories, id: \.self) { cat in
                                Text(cat).tag(cat)
                            }
                        }
                    }
                    .listRowBackground(Color.white.opacity(0.05))
                    
                    Section(header: Text("Isi Pertanyaan").foregroundColor(.gray)) {
                        TextEditor(text: $content)
                            .frame(height: 150)
                            .foregroundColor(.white)
                    }
                    .listRowBackground(Color.white.opacity(0.05))
                }
                .background(Color.black)
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Mulai Diskusi")
            .navigationBarTitleDisplayMode(.inline)
            .navigationBarItems(
                leading: Button("Batal") { isPresented = false }.foregroundColor(.indigo),
                trailing: Button("Kirim") {
                    guard !title.trimmingCharacters(in: .whitespaces).isEmpty,
                          !content.trimmingCharacters(in: .whitespaces).isEmpty else { return }
                    
                    isSubmitting = true
                    Task {
                        let success = await network.createThread(title: title, category: category, content: content)
                        isSubmitting = false
                        if success {
                            isPresented = false
                        }
                    }
                }
                .foregroundColor(.indigo)
                .disabled(isSubmitting)
            )
        }
        .preferredColorScheme(.dark)
    }
}
