FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod ./
COPY main.go ./

RUN go build -o api-server main.go

FROM alpine:3.22.4

WORKDIR /app

COPY --from=builder /app/api-server .

EXPOSE 3001

CMD ["./api-server"]