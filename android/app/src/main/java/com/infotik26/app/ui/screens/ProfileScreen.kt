/* Hallmark · android-view: ProfileScreen.kt · theme: Compose-Native */
package com.infotik26.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.infotik26.app.data.UserAccount

@Composable
fun ProfileScreen(currentUser: UserAccount, onLogout: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .padding(16.dp),
        contentAlignment = Alignment.TopCenter
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(24.dp),
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 40.dp)
        ) {
            // Avatar Circle
            Box(
                modifier = Modifier
                    .size(100.dp)
                    .background(Color(0xFF6366F1).copy(alpha = 0.15f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "👤",
                    fontSize = 44.sp
                )
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = currentUser.name,
                    color = Color.white,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "NIM: ${currentUser.nim}",
                    color = Color.Gray,
                    fontSize = 13.sp,
                    fontFamily = FontFamily.Monospace
                )
            }

            // Info rows list card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1F2937).copy(alpha = 0.4f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column {
                    ProfileRow(label = "Nomor WhatsApp", value = currentUser.whatsapp)
                    ProfileRow(label = "Alamat Email", value = currentUser.email)
                    ProfileRow(label = "Hak Akses/Peran", value = currentUser.role.uppercase())
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            // Logout Action Button
            Button(
                onClick = onLogout,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.Red.copy(alpha = 0.1f),
                    contentColor = Color.Red
                ),
                shape = RoundedCornerShape(14.dp),
                border = ButtonDefaults.outlinedButtonBorder.copy(
                    brush = androidx.compose.ui.graphics.SolidColor(Color.Red.copy(alpha = 0.3f))
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
            ) {
                Text(
                    text = "Keluar dari Akun",
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            }

            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}

@Composable
fun ProfileRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = label, color = Color.Gray, fontSize = 12.sp)
        Text(text = value, color = Color.white, fontSize = 13.sp, fontWeight = FontWeight.Bold)
    }
}
