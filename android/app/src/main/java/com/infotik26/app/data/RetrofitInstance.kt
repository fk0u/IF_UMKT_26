/* Hallmark · android-network: RetrofitInstance.kt · theme: Compose-Native */
package com.infotik26.app.data

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitInstance {
    // 10.0.2.2 is the special alias to the host loopback interface in Android Emulator.
    // Change this to your deployed Vercel URL (e.g., https://if-umkt-26.vercel.app/) when deploying.
    private const val BASE_URL = "http://10.0.2.2:3001/"

    val api: NetworkService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(NetworkService::class.java)
    }
}
