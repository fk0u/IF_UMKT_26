/* Hallmark · ios-view: NewsView.swift · theme: SwiftUI-Native */
import SwiftUI

struct NewsView: View {
    @EnvironmentObject var network: NetworkManager

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.ignoresSafeArea()
                
                if network.isLoading && network.news.isEmpty {
                    ProgressView("Memuat Berita...")
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        .foregroundColor(.gray)
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 16) {
                            ForEach(network.news) { item in
                                NavigationLink(destination: NewsDetailView(item: item)) {
                                    VStack(alignment: .leading, spacing: 10) {
                                        HStack {
                                            Text(item.category)
                                                .font(.system(size: 10, weight: .bold))
                                                .padding(.horizontal, 8)
                                                .padding(.vertical, 4)
                                                .background(Color.indigo.opacity(0.15))
                                                .foregroundColor(.indigo)
                                                .cornerRadius(8)
                                            
                                            Spacer()
                                            
                                            Text(item.date)
                                                .font(.system(size: 10, design: .monospaced))
                                                .foregroundColor(.gray)
                                        }
                                        
                                        Text(item.title)
                                            .font(.headline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.white)
                                            .multilineTextAlignment(.leading)
                                        
                                        Text(item.summary)
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                            .multilineTextAlignment(.leading)
                                            .lineLimit(2)
                                        
                                        HStack {
                                            Image(systemName: "person.circle.fill")
                                                .font(.caption)
                                                .foregroundColor(.gray)
                                            Text(item.author)
                                                .font(.caption)
                                                .foregroundColor(.gray)
                                        }
                                    }
                                    .padding()
                                    .background(Color.white.opacity(0.05))
                                    .cornerRadius(16)
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 16)
                                            .stroke(item.pinned ? Color.amber.opacity(0.4) : Color.clear, lineWidth: 1)
                                    )
                                }
                            }
                        }
                        .padding()
                    }
                    .refreshable {
                        await network.fetchAllData()
                    }
                }
            }
            .navigationTitle("Buletin Kampus")
        }
    }
}

struct NewsDetailView: View {
    let item: NewsItem

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        Text(item.category)
                            .font(.system(size: 10, weight: .bold))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.indigo.opacity(0.15))
                            .foregroundColor(.indigo)
                            .cornerRadius(8)
                        
                        Spacer()
                        
                        Text(item.date)
                            .font(.system(size: 10, design: .monospaced))
                            .foregroundColor(.gray)
                    }
                    
                    Text(item.title)
                        .font(.title)
                        .fontWeight(.black)
                        .foregroundColor(.white)
                    
                    Text("Diterbitkan oleh: \(item.author)")
                        .font(.caption)
                        .foregroundColor(.gray)
                    
                    Divider()
                        .background(Color.white.opacity(0.1))
                    
                    Text(item.content)
                        .font(.body)
                        .foregroundColor(.white.opacity(0.9))
                        .lineSpacing(6)
                }
                .padding()
            }
        }
        .navigationBarTitleDisplayMode(.inline)
    }
}
