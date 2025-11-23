FROM golang
WORKDIR /app
COPY . .
RUN go build -o main ./backend/cmd/main.go
CMD ["./main"]
EXPOSE 8080
