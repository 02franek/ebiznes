FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt-get upgrade -y

# Install python 3.10
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y && apt-get update
RUN apt-get install python3.10 -y
