/* Hallmark · android-view: NewsScreen.kt · theme: Compose-Native */
package com.infotik26.app.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.infotik26.app.data.NewsItem
import com.infotik26.app.data.RetrofitInstance
import kotlinx.coroutines.launch

@Composable
fun NewsScreen() {
    var newsList by remember { mutableStateOf<List<NewsItem>>(emptyList()) }
    var selectedNews by remember { mutableStateOf<NewsItem?>(null) }
    var isLoading by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        isLoading = true
        scope.launch {
            try {
                val res = RetrofitInstance.api.getNews()
                if (res.isSuccessful) {
                    newsList = res.body() ?: emptyList()
                }
            } catch (e: Exception) {
                // local fallback could be added here
            } finally {
                isLoading = false
            }
        }
    }

    if (selectedNews != null) {
        NewsDetailScreen(news = selectedNews!!) {
            selectedNews = null
        }
    } else {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black)
                .padding(16.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                Column {
                    Text(
                        text = "Buletin Pengumuman Resmi",
                        color = Color.white,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Pengumuman dan kabar terbaru seputar Teknik Informatika 2026.",
                        color = Color.Gray,
                        fontSize = 11.sp,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }

                if (isLoading && newsList.isEmpty()) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = Color(0xFF6366F1))
                    }
                } else {
                    LazyColumn(
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                        modifier = Modifier.fillMaxSize()
                    ) {
                        items(newsList) { news ->
                            NewsCard(news = news) {
                                selectedNews = news
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun NewsCard(news: NewsItem, onClick: () -> Unit) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1F2937).copy(alpha = 0.4f)),
        border = BorderStroke(
            1.dp,
            if (news.pinned) Color(0xFFF59E0B).copy(alpha = 0.4f) else Color.white.copy(alpha = 0.05f)
        ),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = news.category,
                    color = Color(0xFF6366F1),
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .background(Color(0xFF6366F1).copy(alpha = 0.1f), RoundedCornerShape(6.dp))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                )

                Text(
                    text = news.date,
                    color = Color.Gray,
                    fontSize = 9.sp
                )
            }

            Text(
                text = news.title,
                color = Color.white,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold
            )

            Text(
                text = news.summary,
                color = Color.LightGray,
                fontSize = 11.sp,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )

            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "Diterbitkan oleh: ",
                    color = Color.DarkGray,
                    fontSize = 10.sp
                )
                Text(
                    text = news.author,
                    color = Color.Gray,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Medium
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NewsDetailScreen(news: NewsItem, onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Detail Pengumuman", fontSize = 16.sp, fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Text("←", color = Color.white, fontSize = 20.sp)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color.Black,
                    titleContentColor = Color.white
                )
            )
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black)
                .padding(padding)
                .padding(16.dp)
        ) {
            Column(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                Row(
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = news.category,
                        color = Color(0xFF6366F1),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier
                            .background(Color(0xFF6366F1).copy(alpha = 0.1f), RoundedCornerShape(6.dp))
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    )

                    Text(
                        text = news.date,
                        color = Color.Gray,
                        fontSize = 10.sp
                    )
                }

                Text(
                    text = news.title,
                    color = Color.white,
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Black
                )

                Text(
                    text = "Penulis: ${news.author}",
                    color = Color.Gray,
                    fontSize = 11.sp
                )

                Divider(color = Color.white.copy(alpha = 0.1f))

                Text(
                    text = news.content,
                    color = Color.white.copy(alpha = 0.9f),
                    fontSize = 13.sp,
                    lineHeight = 20.sp
                )
            }
        }
    }
}
