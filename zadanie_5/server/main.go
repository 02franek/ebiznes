package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Product struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Price int `json:"price"`
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func productsHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	products := []Product{
		{ID: 1, Name: "Headphones", Price: 300},
		{ID: 2, Name: "Keyboard RGB", Price: 500},
		{ID: 3, Name: "MacBook", Price: 4000},				
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func paymentsHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method == http.MethodPost {
		body, _ := io.ReadAll(r.Body)
		fmt.Printf("Received payment request information: %s\n", string(body))
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "Payment received"}`))
	} else {
		http.Error(w, "Method not supported", http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/api/products", productsHandler)
	http.HandleFunc("/api/payments", paymentsHandler)

	fmt.Println("Listening on port 8080...")
	http.ListenAndServe(":8080", nil)
}