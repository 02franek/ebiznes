import io.github.cdimascio.dotenv.dotenv

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.http.isSuccess
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class DiscordMessage(val content: String)


fun main() = runBlocking {
    val dotenv = dotenv { ignoreIfMissing = true }
    val token = dotenv["DISCORD_TOKEN"] ?: throw Exception("No 'DISCORD_TOKEN' present in .env")
    val channelId = dotenv["DISCORD_CHANNEL_ID"] ?: throw Exception("No 'DISCORD_CHANNEL_ID' present in .env")

    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }


    val res = client.post("https://discord.com/api/v10/channels/$channelId/messages") {
        header(HttpHeaders.Authorization, "Bot $token")
        contentType(ContentType.Application.Json)
        setBody(DiscordMessage("Hi, discord bot here, finally configured and working"))
    }

    if (res.status.isSuccess()) {
        println("Message sent: ${res.status}")
    }
    else {
        println("Error sending message: ${res.status}")
        println(res.bodyAsText())
    }

    client.close()
}