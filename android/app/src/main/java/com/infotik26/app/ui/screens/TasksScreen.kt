/* Hallmark · android-view: TasksScreen.kt · theme: Compose-Native */
package com.infotik26.app.ui.screens

import androidx.compose.foundation.background
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
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.infotik26.app.data.TaskItem
import com.infotik26.app.data.RetrofitInstance
import kotlinx.coroutines.launch

@Composable
fun TasksScreen() {
    var tasks by remember { mutableStateOf<List<TaskItem>>(emptyList()) }
    var isLoading by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        isLoading = true
        scope.launch {
            try {
                val res = RetrofitInstance.api.getTasks()
                if (res.isSuccessful) {
                    tasks = res.body() ?: emptyList()
                }
            } catch (e: Exception) {}
            finally {
                isLoading = false
            }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .padding(16.dp)
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Column {
                Text(
                    text = "Daftar Tugas Kuliah",
                    color = Color.white,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            if (isLoading && tasks.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator(color = Color(0xFF6366F1))
                }
            } else {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier.fillMaxSize()
                ) {
                    items(tasks) { task ->
                        TaskCard(task = task)
                    }
                }
            }
        }
    }
}

@Composable
fun TaskCard(task: TaskItem) {
    val isCompleted = task.status == "Selesai"
    
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1F2937).copy(alpha = 0.4f)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Status Checkbox Mimic Icon
            Text(
                text = if (isCompleted) "✓" else "○",
                color = if (isCompleted) Color(0xFF10B981) else Color.Gray,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )

            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = task.title,
                    color = if (isCompleted) Color.Gray else Color.white,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    textDecoration = if (isCompleted) TextDecoration.LineThrough else null
                )

                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = task.course,
                        color = Color(0xFF6366F1),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                    Text("•", color = Color.Gray, fontSize = 10.sp)
                    Text(
                        text = "Tenggat: ${task.deadline}",
                        color = Color.Gray,
                        fontSize = 10.sp
                    )
                }
            }

            // Priority Badge
            Text(
                text = task.priority,
                color = getPriorityColor(task.priority),
                fontSize = 8.sp,
                fontWeight = FontWeight.Black,
                modifier = Modifier
                    .background(getPriorityColor(task.priority).copy(alpha = 0.15f), RoundedCornerShape(6.dp))
                    .padding(horizontal = 6.dp, vertical = 3.dp)
            )
        }
    }
}

fun getPriorityColor(priority: String): Color {
    return when (priority) {
        "Tinggi", "Sangat Tinggi" -> Color.Red
        "Sedang" -> Color(0xFFF59E0B)
        else -> Color(0xFF3B82F6)
    }
}
