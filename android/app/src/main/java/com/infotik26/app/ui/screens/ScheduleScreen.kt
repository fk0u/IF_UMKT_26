/* Hallmark · android-view: ScheduleScreen.kt · theme: Compose-Native */
package com.infotik26.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.infotik26.app.data.ScheduleItem
import com.infotik26.app.data.RetrofitInstance
import kotlinx.coroutines.launch

@Composable
fun ScheduleScreen() {
    var schedules by remember { mutableStateOf<List<ScheduleItem>>(emptyList()) }
    var selectedDay by remember { mutableStateOf("Senin") }
    var isLoading by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    val days = listOf("Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu")

    LaunchedEffect(Unit) {
        isLoading = true
        scope.launch {
            try {
                val res = RetrofitInstance.api.getSchedules()
                if (res.isSuccessful) {
                    schedules = res.body() ?: emptyList()
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
                    text = "Jadwal Kuliah Semester 1",
                    color = Color.white,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            // Horizontal Day Selector
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(days) { day ->
                    val isSelected = selectedDay == day
                    Box(
                        modifier = Modifier
                            .background(
                                if (isSelected) Color.white else Color.white.copy(alpha = 0.05f),
                                RoundedCornerShape(20.dp)
                            )
                            .clickable { selectedDay = day }
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Text(
                            text = day,
                            color = if (isSelected) Color.Black else Color.white,
                            fontSize = 12.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                        )
                    }
                }
            }

            if (isLoading && schedules.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator(color = Color(0xFF6366F1))
                }
            } else {
                val daySchedules = schedules.filter { it.day == selectedDay }
                
                if (daySchedules.isEmpty()) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text("📅", fontSize = 36.sp)
                            Text("Tidak ada jadwal kuliah hari ini.", color = Color.Gray, fontSize = 12.sp)
                        }
                    }
                } else {
                    LazyColumn(
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                        modifier = Modifier.fillMaxSize()
                    ) {
                        items(daySchedules) { sch ->
                            ScheduleCard(sch = sch)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ScheduleCard(sch: ScheduleItem) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1F2937).copy(alpha = 0.4f)),
        modifier = Modifier.fillMaxWidth()
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
                    text = sch.time,
                    color = Color(0xFF6366F1),
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )

                Text(
                    text = sch.badge,
                    color = Color.white,
                    fontSize = 8.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .background(Color.white.copy(alpha = 0.1f), RoundedCornerShape(6.dp))
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                )
            }

            Text(
                text = sch.course,
                color = Color.white,
                fontSize = 15.sp,
                fontWeight = FontWeight.Black
            )

            Text(
                text = "Dosen: ${sch.lecturer}",
                color = Color.Gray,
                fontSize = 11.sp
            )

            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(top = 4.dp)
            ) {
                Text(
                    text = "📍 Room ${sch.room}",
                    color = Color.Gray,
                    fontSize = 10.sp
                )
                Text(
                    text = "📄 ${sch.sks} SKS",
                    color = Color.Gray,
                    fontSize = 10.sp
                )
            }
        }
    }
}
