/* Hallmark · android-model: Models.kt · theme: Compose-Native */
package com.infotik26.app.data

data class UserAccount(
    val id: String,
    val name: String,
    val nim: String,
    val whatsapp: String,
    val email: String,
    val role: String,
    val avatar: String
)

data class NewsItem(
    val id: String,
    val title: String,
    val date: String,
    val category: String,
    val author: String,
    val pinned: Boolean,
    val summary: String,
    val content: String
)

data class TaskItem(
    val id: String,
    val title: String,
    val course: String,
    val deadline: String,
    val priority: String,
    val status: String,
    val description: String?
)

data class ScheduleItem(
    val id: String,
    val day: String,
    val dayCode: Int,
    val time: String,
    val startTime: String,
    val endTime: String,
    val course: String,
    val lecturer: String,
    val room: String,
    val building: String,
    val sks: Int,
    val badge: String,
    val color: String
)

data class ForumReply(
    val author: String,
    val avatar: String,
    val date: String,
    val content: String
)

data class ForumThread(
    val id: String,
    val author: String,
    val nim: String,
    val avatar: String,
    val title: String,
    val category: String,
    val content: String,
    val date: String,
    val upvotes: Int,
    val replies: List<ForumReply>
)

data class AuthResponse(
    val user: UserAccount
)
