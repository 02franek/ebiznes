
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.serialization)
    application
}

group = "com.example"
version = "1.0.0-SNAPSHOT"

application {

    mainClass.set("MainKt")
    applicationName = "bot-app"
}

kotlin {
    jvmToolchain(21)
}

dependencies {
    val ktorVersion = "2.3.11"

    implementation("io.ktor:ktor-client-core:$ktorVersion")
    implementation("io.ktor:ktor-client-cio:$ktorVersion")
    implementation("io.ktor:ktor-client-websockets:$ktorVersion")
    implementation("io.ktor:ktor-client-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktorVersion")
    
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.1")
    
    implementation(libs.logback.classic)

    testImplementation(kotlin("test"))
}
