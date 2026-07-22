/* Hallmark · android-view: MainScreen.kt · theme: Compose-Native */
package com.infotik26.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.infotik26.app.data.UserAccount

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    currentUser: UserAccount,
    onLogout: () -> Unit,
    // Add references to fetch hooks or network actions
    fetchDataTrigger: suspend () -> Unit
) {
    var selectedTab by remember { mutableStateOf(0) }
    
    LaunchedEffect(Unit) {
        fetchDataTrigger()
    }

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = Color(0xFF111827),
                tonalElevation = 8.dp
            ) {
                NavigationBarItem(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    icon = { Text("📣", style = MaterialTheme.typography.titleMedium) },
                    label = { Text("Buletin") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.white,
                        unselectedIconColor = Color.Gray,
                        selectedTextColor = Color.white,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFF6366F1).copy(alpha = 0.3f)
                    )
                )

                NavigationBarItem(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    icon = { Text("📅", style = MaterialTheme.typography.titleMedium) },
                    label = { Text("Jadwal") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.white,
                        unselectedIconColor = Color.Gray,
                        selectedTextColor = Color.white,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFF6366F1).copy(alpha = 0.3f)
                    )
                )

                NavigationBarItem(
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 },
                    icon = { Text("💬", style = MaterialTheme.typography.titleMedium) },
                    label = { Text("Forum") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.white,
                        unselectedIconColor = Color.Gray,
                        selectedTextColor = Color.white,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFF6366F1).copy(alpha = 0.3f)
                    )
                )

                NavigationBarItem(
                    selected = selectedTab == 3,
                    onClick = { selectedTab = 3 },
                    icon = { Text("✅", style = MaterialTheme.typography.titleMedium) },
                    label = { Text("Tugas") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.white,
                        unselectedIconColor = Color.Gray,
                        selectedTextColor = Color.white,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFF6366F1).copy(alpha = 0.3f)
                    )
                )

                NavigationBarItem(
                    selected = selectedTab == 4,
                    onClick = { selectedTab = 4 },
                    icon = { Text("👤", style = MaterialTheme.typography.titleMedium) },
                    label = { Text("Profil") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.white,
                        unselectedIconColor = Color.Gray,
                        selectedTextColor = Color.white,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFF6366F1).copy(alpha = 0.3f)
                    )
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black)
                .padding(paddingValues)
        ) {
            when (selectedTab) {
                0 -> NewsScreen()
                1 -> ScheduleScreen()
                2 -> ForumScreen(currentUser = currentUser)
                3 -> TasksScreen()
                4 -> ProfileScreen(currentUser = currentUser, onLogout = onLogout)
            }
        }
    }
}
