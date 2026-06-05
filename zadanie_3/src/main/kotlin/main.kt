import io.github.cdimascio.dotenv.dotenv
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.http.*

import kotlinx.coroutines.runBlocking

fun main() {
    val dotenv = dotenv { ignoreIfMissing = true }
    val token = dotenv["DISCORD_TOKEN"] ?: throw Exception("No 'DISCORD_TOKEN' present in .env")

    val bot = DiscordBot(token)

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        install(ContentNegotiation) {
            json()
        }

        install(CORS) {
            anyHost()
            allowHeader(HttpHeaders.ContentType)
        }

        routing {
            staticResources("/", "static")

            post("/api/chat") {
                val request = call.receive<Map<String, String>>()
                val userMessage: String = request["message"] ?: ""

                println("Received message from frontend: $userMessage")

                val gptServiceReply = bot.askPythonGPTService(userMessage)

                call.respond(mapOf("reply" to gptServiceReply))
            }
        }
    }.start(wait = false)

    runBlocking {
        bot.start()
    }
}
