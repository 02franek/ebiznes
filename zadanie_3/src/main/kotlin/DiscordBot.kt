import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.websocket.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

@Serializable
data class DiscordMessage(val content: String)


class DiscordBot(private val token: String) {
    private val client = HttpClient(CIO) {
        install(WebSockets)
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    private val messageHandler = MessageHandler()

    suspend fun start() {
        client.wss(host = "gateway.discord.gg", port = 443, path = "/?v=10&encoding=json") {
            println("Connected to Discord Gateway")

            val messageFrame = incoming.receive() as Frame.Text
            val messageJson = Json.parseToJsonElement(messageFrame.readText()).jsonObject
            val heartbeatInterval = messageJson["d"]?.jsonObject?.get("heartbeat_interval")?.jsonPrimitive?.long ?: 41250L

            launch {
                while (isActive) {
                    delay(heartbeatInterval)
                send    (Frame.Text("""{"op": 1, "d": null}"""))
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
                        
                        if (!isBot && content != null && channelId != null) {
                            val responseText = messageHandler.handle(content)
                            
                            if (responseText != null) {
                                sendMessage(channelId, responseText)
                            }
                        }
                    }
                }
            }
        }
    }

    private suspend fun sendMessage(channelId: String, text: String) {
        client.post("https://discord.com/api/v10/channels/$channelId/messages") {
            header(HttpHeaders.Authorization, "Bot $token")
            contentType(ContentType.Application.Json)
            setBody(DiscordMessage(text))
        }
    }
}