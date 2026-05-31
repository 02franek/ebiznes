class MessageHandler {
    fun handle(command: String): String? {
        val parts = command.trim().split("\\s+".toRegex())
        val baseCommand = parts[0].lowercase()

        return when (baseCommand) {
            "!categories" -> {
                val list = Database.categories.joinToString(separator = "\n") { "  $it" }
                "List of available categories:\n$list"
            }

            "!products" -> {
                if (parts.size < 2) { return "Usage: `!products <Category>`" }
                
                val requestedCategory = parts[1].lowercase()
                val products = Database.products[requestedCategory]

                if (products != null) {
                    val list = products.joinToString(separator="\n") { "  $it" }
                    "$requestedCategory products:\n$list"
                } else {
                    "Category $requestedCategory not found. To see available categories type: `!categories`"
                }
            }

            else -> null
        }
    }
}