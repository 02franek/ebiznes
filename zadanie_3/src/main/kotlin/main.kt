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
import io.ktor.client.plugins.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.serialization.json.*

@Serializable
data class DiscordMessage(val content: String)


fun main() = runBlocking {
    val dotenv = dotenv { ignoreIfMissing = true }
    val token = dotenv["DISCORD_TOKEN"] ?: throw Exception("No 'DISCORD_TOKEN' present in .env")

    val client = HttpClient(CIO) {
        install(WebSockets)
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    client.wss(host="gateway.discord.gg", port=443, path="/?v=10&encoding=json") {
        println("Connected to Discord Gateway!")

        val messageFrame = incoming.receive() as Frame.Text
        val messageJson = Json.parseToJsonElement(messageFrame.readText()).jsonObject
        val heartbeatInterval = messageJson["d"]?.jsonObject?.get("heartbeat_interval")?.jsonPrimitive?.long ?: 41250L

        launch {
            while (isActive) {
                delay(heartbeatInterval)
                send(Frame.Text("""{"op": 1, "d": null}"""))
            }
        }

        val identifyPayload = """
            {
              "op": 2,
              "d": {
                "token": "$token",
                "intents": 33280,
                "properties": {
                  "os": "linux",
                  "browser": "ktor-bot",
                  "device": "ktor-bot"
                }
              }
            }
        """.trimIndent()
        send(Frame.Text(identifyPayload))

        for (frame in incoming) {
            if (frame is Frame.Text) {
                val text = frame.readText()
                val payload = Json.parseToJsonElement(text).jsonObject
                
                val op = payload["op"]?.jsonPrimitive?.int
                val t = payload["t"]?.jsonPrimitive?.content


                if (op == 0 && t == "MESSAGE_CREATE") {
                    val data = payload["d"]?.jsonObject
                    val author = data?.get("author")?.jsonObject
                    val isBot = author?.get("bot")?.jsonPrimitive?.booleanOrNull ?: false

                    val content = data?.get("content")?.jsonPrimitive?.content
                    val channelId = data?.get("channel_id")?.jsonPrimitive?.content
                    
                    
                    if (!isBot && content == "!hello" && channelId != null) {
                        val username = author?.get("username")?.jsonPrimitive?.content
                        
                        println("Received new message from '$username': $content")

                        client.post("https://discord.com/api/v10/channels/$channelId/messages") {
                            header(HttpHeaders.Authorization, "Bot $token")
                            contentType(ContentType.Application.Json)
                            setBody(DiscordMessage("world!"))
                        }                        
                    }
                }


            }
        }

    }
}
