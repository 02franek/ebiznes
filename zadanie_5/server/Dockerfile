FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod ./
COPY main.go ./

RUN go build -o api-server main.go

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/api-server .

EXPOSE 3001

CMD ["./api-server"]