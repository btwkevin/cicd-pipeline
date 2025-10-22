package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func JsonRes(key string, value string) []byte {
	mapres := map[string]string{
		key: value,
	}

	res, _ := json.Marshal(mapres)
	return res
}

func ServeHtml(w http.ResponseWriter, r *http.Request) {
	Html, err := os.ReadFile("./frontend/index.html")
	if err != nil {
		res := JsonRes("error", "read html file error")
		w.Header().Set("Content-Type", "application/json")
		w.Write(res)
	}

	w.Header().Set("Content-Type", "text/html")
	w.Write(Html)
}

func ServeCss(w http.ResponseWriter, r *http.Request) {
	Html, err := os.ReadFile("./frontend/style.css")
	if err != nil {
		res := JsonRes("error", "read css file error")
		w.Header().Set("Content-Type", "application/json")
		w.Write(res)
	}

	w.Header().Set("Content-Type", "text/css")
	w.Write(Html)
}

func ServeJs(w http.ResponseWriter, r *http.Request) {
	Html, err := os.ReadFile("./frontend/script.js")
	if err != nil {
		res := JsonRes("error", "read file error")
		w.Header().Set("Content-Type", "application/json")
		w.Write(res)
	}

	w.Header().Set("Content-Type", "text/javascript")
	w.Write(Html)
}

func main() {
	http.HandleFunc("/", ServeHtml)
	http.HandleFunc("/style.css", ServeCss)
	http.HandleFunc("/script.js", ServeJs)

	fmt.Println("Server Listen : 8080")
	http.ListenAndServe(":8080", nil)
}
