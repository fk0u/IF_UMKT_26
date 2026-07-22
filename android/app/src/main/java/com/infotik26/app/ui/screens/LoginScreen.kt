/* Hallmark · android-view: LoginScreen.kt · theme: Compose-Native */
package com.infotik26.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(
    onLoginSuccess: (emailOrNim: String, passwordOrPin: String) -> Unit,
    errorMessage: String?,
    isLoading: Boolean
) {
    var emailOrNim by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var alertMessage by remember { mutableStateOf<String?>(null) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            // Header Logo
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .background(Color(0xFF6366F1).copy(alpha = 0.15f), RoundedCornerShape(20.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "</>",
                    color = Color(0xFF6366F1),
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "INFOTIK 26",
                    color = Color.white,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Black
                )
                Text(
                    text = "Pusat Informasi Mahasiswa TI 2026",
                    color = Color.Gray,
                    fontSize = 12.sp,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Inputs
            OutlinedTextField(
                value = emailOrNim,
                onValueChange = { emailOrNim = it },
                label = { Text("Email atau NIM", color = Color.Gray) },
                colors = TextFieldDefaults.outlinedTextFieldColors(
                    focusedBorderColor = Color(0xFF6366F1),
                    unfocusedBorderColor = Color.white.copy(alpha = 0.1f),
                    focusedLabelColor = Color(0xFF6366F1),
                    cursorColor = Color(0xFF6366F1)
                ),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("Password", color = Color.Gray) },
                visualTransformation = PasswordVisualTransformation(),
                colors = TextFieldDefaults.outlinedTextFieldColors(
                    focusedBorderColor = Color(0xFF6366F1),
                    unfocusedBorderColor = Color.white.copy(alpha = 0.1f),
                    focusedLabelColor = Color(0xFF6366F1),
                    cursorColor = Color(0xFF6366F1)
                ),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            // API error message display
            if (errorMessage != null) {
                Text(
                    text = errorMessage,
                    color = Color.Red,
                    fontSize = 12.sp,
                    modifier = Modifier.padding(horizontal = 4.dp)
                )
            }

            if (alertMessage != null) {
                Text(
                    text = alertMessage!!,
                    color = Color(0xFFF59E0B),
                    fontSize = 12.sp,
                    modifier = Modifier.padding(horizontal = 4.dp)
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            // Action Button
            Button(
                onClick = {
                    if (!emailOrNim.contains("@") && !emailOrNim.startsWith("26")) {
                        alertMessage = "NIM tidak valid. Hanya Mahasiswa Angkatan 2026 (awalan 26) yang diperbolehkan masuk."
                        return
                    }
                    alertMessage = null
                    onLoginSuccess(emailOrNim, password)
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.white,
                    contentColor = Color.Black
                ),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                enabled = !isLoading
            ) {
                if (isLoading) {
                    CircularProgressIndicator(color = Color.Black, modifier = Modifier.size(24.dp))
                } else {
                    Text(
                        text = "Masuk Akun",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp
                    )
                }
            }

            Text(
                text = "Hanya Mahasiswa Angkatan 2026 yang diperbolehkan masuk.",
                color = Color.DarkGray,
                fontSize = 10.sp,
                modifier = Modifier.padding(top = 16.dp)
            )
        }
    }
}
