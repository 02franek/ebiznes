import java.sql.DriverManager

fun main() {
	println("Hello world!")
	val dbUrl = "jdbc:sqlite:test.db"

	try {
		DriverManager.getConnection(dbUrl).use { connection ->
			connection.createStatement().use { statement ->
				statement.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
				statement.execute("INSERT INTO users (name) VALUES ('Jan Docker II')")

				val queryRes = statement.executeQuery("SELECT * FROM users")
				while (queryRes.next()) {
					println("${queryRes.getInt("id")} | Name: ${queryRes.getString("name")}")
				}
			}
		}
	} catch (e: Exception) {
		println("${e.message}");
	}
}
