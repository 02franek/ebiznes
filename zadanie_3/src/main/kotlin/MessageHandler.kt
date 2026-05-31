class MessageHandler {
    fun handle(command: String): String? {
        return when (command) {
            "!hello" -> "world!"
            "!categories" -> {
                val list = Database.categories.joinToString(separator = "\n") { "  $it" }
                "List of available categories:\n$list"
            }
            else -> null
        }
    }
}