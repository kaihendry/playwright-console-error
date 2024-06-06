package main

import (
	"fmt"
	"html/template"
	"log/slog"
	"net/http"
	"os"
)

func index(w http.ResponseWriter, r *http.Request) {
	err := template.Must(template.New("index.html").ParseFiles("index.html")).Execute(w, map[string]interface{}{
		"Test": os.Getenv("TEST"),
	})

	if err != nil {
		slog.Error("error executing template", "error", err)
	}
}

func main() {
	http.HandleFunc("/", index)
	slog.Info("starting local server", "port", os.Getenv("PORT"))
	err := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil)
	slog.Error("error listening", "error", err)
}
