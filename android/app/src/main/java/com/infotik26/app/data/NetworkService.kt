/* Hallmark · android-network: NetworkService.kt · theme: Compose-Native */
package com.infotik26.app.data

import retrofit2.Response
import retrofit2.http.*

interface NetworkService {
    @POST("api/auth/login")
    suspend fun login(
        @Body body: Map<String, String>
    ): Response<AuthResponse>

    @POST("api/auth/register")
    suspend fun register(
        @Body body: Map<String, String>
    ): Response<AuthResponse>

    @GET("api/users")
    suspend fun getUsers(): Response<List<UserAccount>>

    @GET("api/news")
    suspend fun getNews(): Response<List<NewsItem>>

    @GET("api/tasks")
    suspend fun getTasks(): Response<List<TaskItem>>

    @GET("api/schedules")
    suspend fun getSchedules(): Response<List<ScheduleItem>>

    @GET("api/forum")
    suspend fun getForum(): Response<List<ForumThread>>

    @POST("api/forum")
    suspend fun createThread(
        @Body body: Map<String, String>
    ): Response<ForumThread>

    @POST("api/forum/{id}/upvote")
    suspend fun upvoteThread(
        @Path("id") threadId: String
    ): Response<ForumThread>

    @POST("api/forum/{id}/replies")
    suspend fun addReply(
        @Path("id") threadId: String,
        @Body body: Map<String, String>
    ): Response<ForumThread>

    @PUT("api/forum/{id}")
    suspend fun updateThread(
        @Path("id") threadId: String,
        @Body body: Map<String, String>
    ): Response<ForumThread>

    @DELETE("api/forum/{id}")
    suspend fun deleteThread(
        @Path("id") threadId: String
    ): Response<Map<String, Boolean>>

    @DELETE("api/forum/{id}/replies/{index}")
    suspend fun deleteReply(
        @Path("id") threadId: String,
        @Path("index") replyIndex: Int
    ): Response<ForumThread>
}
