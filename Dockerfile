FROM golang:1.25 AS build

WORKDIR /src/reubin2
COPY reubin2/go.mod reubin2/go.sum ./
RUN go mod download

COPY reubin2/ ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /out/reubin2 ./cmd/reubin2

FROM gcr.io/distroless/base-debian12

WORKDIR /app
COPY --from=build /out/reubin2 /app/reubin2

EXPOSE 8080
ENTRYPOINT ["/app/reubin2"]
