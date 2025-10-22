FROM golang
WORKDIR /app
COPY . .
RUN make build
CMD ["./main"]
EXPOSE 8080
