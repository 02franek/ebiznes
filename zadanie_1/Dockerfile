FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt-get upgrade -y

# Install python 3.10
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y && apt-get update
RUN apt-get install python3.10 -y

# Install Java 8
RUN apt-get install -y openjdk-8-jdk

# Install Kotlin
RUN apt-get install -y wget zip unzip
RUN wget -q https://github.com/JetBrains/kotlin/releases/download/v2.3.20/kotlin-compiler-2.3.20.zip \
	&& unzip -q kotlin-compiler-2.3.20.zip -d /opt/ \
	&& rm kotlin-compiler-2.3.20.zip
ENV PATH="/opt/kotlinc/bin:${PATH}"





