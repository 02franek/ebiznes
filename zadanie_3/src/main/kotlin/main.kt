import io.github.cdimascio.dotenv.dotenv

import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val dotenv = dotenv { ignoreIfMissing = true }
    val token = dotenv["DISCORD_TOKEN"] ?: throw Exception("No 'DISCORD_TOKEN' present in .env")

    val bot = DiscordBot(token)
    bot.start()
}
