/* Hallmark · android-view: ForumScreen.kt · theme: Compose-Native */
package com.infotik26.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.infotik26.app.data.ForumThread
import com.infotik26.app.data.RetrofitInstance
import com.infotik26.app.data.UserAccount
import kotlinx.coroutines.launch

@Composable
fun ForumScreen(currentUser: UserAccount) {
    var threads by remember { mutableStateOf<List<ForumThread>>(emptyList()) }
    var selectedThreadId by remember { mutableStateOf<String?>(null) }
    var selectedCategory by remember { mutableStateOf("Semua") }
    var isLoading by remember { mutableStateOf(false) }
    var showingCreateDialog by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    val categories = listOf("Semua", "Umum & Peralatan", "Info Kost", "Tugas & Coding", "Masta 2026")

    fun loadForum() {
        isLoading = true
        scope.launch {
            try {
                val res = RetrofitInstance.api.getForum()
                if (res.isSuccessful) {
                    threads = res.body() ?: emptyList()
                }
            } catch (e: Exception) {}
            finally {
                isLoading = false
            }
        }
    }

    LaunchedEffect(Unit) {
        loadForum()
    }

    if (selectedThreadId != null) {
        val activeThread = threads.firstOrNull { it.id == selectedThreadId }
        if (activeThread != null) {
            ForumDetailScreen(
                thread = activeThread,
                currentUser = currentUser,
                onBack = { selectedThreadId = null },
                onRefresh = { loadForum() }
            )
        } else {
            selectedThreadId = null
        }
    } else {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black)
                .padding(16.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Diskusi Forum",
                            color = Color.white,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Button(
                        onClick = { showingCreateDialog = true },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF6366F1))
                    ) {
                        Text("+ Tanya", color = Color.white, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }

                // Horizontal Category filter
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    items(categories) { cat ->
                        val isSelected = selectedCategory == cat
                        Box(
                            modifier = Modifier
                                .background(
                                    if (isSelected) Color.white else Color.white.copy(alpha = 0.05f),
                                    RoundedCornerShape(20.dp)
                                )
                                .clickable { selectedCategory = cat }
                                .padding(horizontal = 14.dp, vertical = 8.dp)
                        ) {
                            Text(
                                text = cat,
                                color = if (isSelected) Color.Black else Color.white,
                                fontSize = 11.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                            )
                        }
                    }
                }

                if (isLoading && threads.isEmpty()) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = Color(0xFF6366F1))
                    }
                } else {
                    val filtered = threads.filter { selectedCategory == "Semua" || it.category == selectedCategory }
                    
                    if (filtered.isEmpty()) {
                        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                            Text("Belum ada diskusi di kategori ini.", color = Color.Gray, fontSize = 12.sp)
                        }
                    } else {
                        LazyColumn(
                            verticalArrangement = Arrangement.spacedBy(12.dp),
                            modifier = Modifier.fillMaxSize()
                        ) {
                            items(filtered) { th ->
                                ThreadCard(thread = th) {
                                    selectedThreadId = th.id
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (showingCreateDialog) {
        CreateThreadDialog(
            onDismiss = { showingCreateDialog = false },
            onPostSuccess = { title, category, content ->
                scope.launch {
                    try {
                        RetrofitInstance.api.createThread(
                            mapOf(
                                "title" to title,
                                "category" to category,
                                "content" to content,
                                "author" to currentUser.name,
                                "nim" to currentUser.nim
                            )
                        )
                        loadForum()
                        showingCreateDialog = false
                    } catch (e: Exception) {}
                }
            }
        )
    }
}

@Composable
fun ThreadCard(thread: ForumThread, onClick: () -> Unit) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1F2937).copy(alpha = 0.4f)),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = thread.category,
                    color = Color(0xFF6366F1),
                    fontSize = 8.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .background(Color(0xFF6366F1).copy(alpha = 0.1f), RoundedCornerShape(6.dp))
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                )

                Text(
                    text = thread.date,
                    color = Color.Gray,
                    fontSize = 9.sp
                )
            }

            Text(
                text = thread.title,
                color = Color.white,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )

            Text(
                text = thread.content,
                color = Color.LightGray,
                fontSize = 11.sp,
                maxLines = 2,
                overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
            )

            Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("👍 ${thread.upvotes}", color = Color.Gray, fontSize = 10.sp)
                    Text("💬 ${thread.replies.size} Balasan", color = Color.Gray, fontSize = 10.sp)
                }

                Text(
                    text = thread.author,
                    color = Color.Gray,
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ForumDetailScreen(
    thread: ForumThread,
    currentUser: UserAccount,
    onBack: () -> Unit,
    onRefresh: () -> Unit
) {
    var replyText by remember { mutableStateOf("") }
    var isEditing by remember { mutableStateOf(false) }
    
    var editTitle by remember { mutableStateOf(thread.title) }
    var editCategory by remember { mutableStateOf(thread.category) }
    var editContent by remember { mutableStateOf(thread.content) }
    
    val scope = rememberCoroutineScope()
    val isAdmin = currentUser.role == "admin"

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Detail Diskusi", fontSize = 16.sp, fontWeight = FontWeight.Bold) },
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
        ) {
            Column(modifier = Modifier.fillMaxSize()) {
                // Admin mode banner
                if (isAdmin) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color.Magenta.copy(alpha = 0.1f))
                            .padding(8.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text("🛡️", fontSize = 14.sp)
                        Text(
                            text = "Mode Moderasi Admin Aktif (Bisa Ubah/Hapus Utas & Balasan)",
                            color = Color.Magenta,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                LazyColumn(
                    modifier = Modifier
                        .weight(1f)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    item {
                        if (isEditing) {
                            // Inline Editor UI
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .background(Color.White.copy(alpha = 0.05f), RoundedCornerShape(16.dp))
                                    .padding(16.dp),
                                verticalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                Text("Ubah Utas Diskusi", color = Color.white, fontWeight = FontWeight.Bold)
                                
                                OutlinedTextField(
                                    value = editTitle,
                                    onValueChange = { editTitle = it },
                                    label = { Text("Judul", color = Color.Gray) },
                                    modifier = Modifier.fillMaxWidth()
                                )

                                OutlinedTextField(
                                    value = editContent,
                                    onValueChange = { editContent = it },
                                    label = { Text("Konten", color = Color.Gray) },
                                    modifier = Modifier.fillMaxWidth()
                                )

                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Button(
                                        onClick = {
                                            scope.launch {
                                                try {
                                                    RetrofitInstance.api.updateThread(
                                                        thread.id,
                                                        mapOf(
                                                            "title" to editTitle,
                                                            "category" to editCategory,
                                                            "content" to editContent
                                                        )
                                                    )
                                                    onRefresh()
                                                    isEditing = false
                                                } catch (e: Exception) {}
                                            }
                                        },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color.white, contentColor = Color.Black)
                                    ) {
                                        Text("Simpan", fontWeight = FontWeight.Bold)
                                    }
                                    
                                    Button(
                                        onClick = { isEditing = false },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color.Gray)
                                    ) {
                                        Text("Batal")
                                    }
                                }
                            }
                        } else {
                            // Normal thread card UI
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .background(Color.White.copy(alpha = 0.05f), RoundedCornerShape(16.dp))
                                    .padding(16.dp),
                                verticalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                Row(
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Column {
                                        Text(thread.author, color = Color.white, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                        Text("NIM: ${thread.nim} • ${thread.date}", color = Color.Gray, fontSize = 9.sp)
                                    }

                                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                        Text(
                                            text = thread.category,
                                            color = Color.white,
                                            fontSize = 8.sp,
                                            fontWeight = FontWeight.Bold,
                                            modifier = Modifier
                                                .background(Color.white.copy(alpha = 0.1f), RoundedCornerShape(6.dp))
                                                .padding(horizontal = 6.dp, vertical = 2.dp)
                                        )

                                        if (isAdmin) {
                                            Text(
                                                text = "✏️",
                                                modifier = Modifier.clickable { isEditing = true }
                                            )
                                            Text(
                                                text = "🗑️",
                                                modifier = Modifier.clickable {
                                                    scope.launch {
                                                        try {
                                                            RetrofitInstance.api.deleteThread(thread.id)
                                                            onRefresh()
                                                            onBack()
                                                        } catch (e: Exception) {}
                                                    }
                                                }
                                            )
                                        }
                                    }
                                }

                                Text(thread.title, color = Color.white, fontSize = 16.sp, fontWeight = FontWeight.Black)
                                Text(thread.content, color = Color.LightGray, fontSize = 12.sp)

                                Row(modifier = Modifier.fillMaxWidth()) {
                                    Button(
                                        onClick = {
                                            scope.launch {
                                                try {
                                                    RetrofitInstance.api.upvoteThread(thread.id)
                                                    onRefresh()
                                                } catch (e: Exception) {}
                                            }
                                        },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent)
                                    ) {
                                        Text("👍 ${thread.upvotes} Upvotes", color = Color(0xFF6366F1), fontSize = 12.sp)
                                    }
                                }
                            }
                        }
                    }

                    item {
                        Text(
                            text = "Diskusi (${thread.replies.size} Balasan)",
                            color = Color.Gray,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    // Comments section
                    itemsIndexed(thread.replies) { index, reply ->
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(Color.White.copy(alpha = 0.03f), RoundedCornerShape(12.dp))
                                .padding(12.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(
                                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text("👤", fontSize = 14.sp)
                                    Text(reply.author, color = Color.white, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                }

                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Text(reply.date, color = Color.Gray, fontSize = 8.sp)
                                    if (isAdmin) {
                                        Text(
                                            text = "✕",
                                            color = Color.Red,
                                            fontSize = 12.sp,
                                            modifier = Modifier.clickable {
                                                scope.launch {
                                                    try {
                                                        RetrofitInstance.api.deleteReply(thread.id, index)
                                                        onRefresh()
                                                    } catch (e: Exception) {}
                                                }
                                            }
                                        )
                                    }
                                }
                            }

                            Text(
                                text = reply.content,
                                color = Color.LightGray,
                                fontSize = 11.sp,
                                modifier = Modifier.padding(left = 22.dp)
                            )
                        }
                    }
                }

                // Reply Input bottom bar
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.DarkGray.copy(alpha = 0.3f))
                        .padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = replyText,
                        onValueChange = { replyText = it },
                        placeholder = { Text("Tulis balasan...", color = Color.Gray, fontSize = 12.sp) },
                        modifier = Modifier.weight(1f),
                        singleLine = true,
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            focusedBorderColor = Color.white.copy(alpha = 0.1f),
                            unfocusedBorderColor = Color.white.copy(alpha = 0.05f)
                        ),
                        shape = RoundedCornerShape(8.dp)
                    )

                    Button(
                        onClick = {
                            if (replyText.trim().isEmpty()) return@Button
                            scope.launch {
                                try {
                                    RetrofitInstance.api.addReply(
                                        thread.id,
                                        mapOf(
                                            "author" to currentUser.name,
                                            "content" to replyText
                                        )
                                    )
                                    replyText = ""
                                    onRefresh()
                                } catch (e: Exception) {}
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color.white, contentColor = Color.Black)
                    ) {
                        Text("Kirim", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }
        }
    }
}

@Composable
fun CreateThreadDialog(onDismiss: () -> Unit, onPostSuccess: (String, String, String) -> Unit) {
    var title by remember { mutableStateOf("") }
    var content by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("Umum & Peralatan") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Mulai Diskusi Baru", color = Color.white) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Judul Pertanyaan") },
                    modifier = Modifier.fillMaxWidth()
                )

                OutlinedTextField(
                    value = content,
                    onValueChange = { content = it },
                    label = { Text("Isi Pertanyaan") },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = { onPostSuccess(title, category, content) },
                colors = ButtonDefaults.buttonColors(containerColor = Color.white, contentColor = Color.Black)
            ) {
                Text("Kirim", fontWeight = FontWeight.Bold)
            }
        },
        dismissButton = {
            Button(
                onClick = onDismiss,
                colors = ButtonDefaults.buttonColors(containerColor = Color.Gray)
            ) {
                Text("Batal")
            }
        },
        containerColor = Color(0xFF111827)
    )
}
