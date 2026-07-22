/* Hallmark · android-activity: MainActivity.kt · theme: Compose-Native */
package com.infotik26.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.Color
import androidx.lifecycle.lifecycleScope
import com.infotik26.app.data.RetrofitInstance
import com.infotik26.app.data.UserAccount
import com.infotik26.app.ui.screens.LoginScreen
import com.infotik26.app.ui.screens.MainScreen
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            var currentUser by remember { mutableStateOf<UserAccount?>(null) }
            var errorMessage by remember { mutableStateOf<String?>(null) }
            var isLoading by remember { mutableStateOf(false) }
            val scope = rememberCoroutineScope()

            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFF6366F1),
                    background = Color.Black,
                    surface = Color(0xFF111827)
                )
            ) {
                if (currentUser != null) {
                    MainScreen(
                        currentUser = currentUser!!,
                        onLogout = { currentUser = null },
                        fetchDataTrigger = {
                            // Fetch all standard datasets
                            scope.launch {
                                try {
                                    RetrofitInstance.api.getNews()
                                    RetrofitInstance.api.getTasks()
                                    RetrofitInstance.api.getSchedules()
                                    RetrofitInstance.api.getForum()
                                } catch (e: Exception) {}
                            }
                        }
                    )
                } else {
                    LoginScreen(
                        onLoginSuccess = { emailOrNim, password ->
                            isLoading = true
                            errorMessage = null
                            lifecycleScope.launch {
                                try {
                                    val response = RetrofitInstance.api.login(
                                        mapOf("emailOrNim" to emailOrNim, "password" to password)
                                    )
                                    if (response.isSuccessful && response.body() != null) {
                                        currentUser = response.body()!!.user
                                    } else {
                                        errorMessage = "Email/NIM atau password salah."
                                    }
                                } catch (e: Exception) {
                                    errorMessage = "Gagal terhubung ke server backend lokal."
                                } finally {
                                    isLoading = false
                                }
                            }
                        },
                        errorMessage = errorMessage,
                        isLoading = isLoading
                    )
                }
            }
        }
    }
}
