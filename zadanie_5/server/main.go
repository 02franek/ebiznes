package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Product struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Price float64 `json:"price"`
	Description string `json:"description"`
}
   

type PaymentRequest struct {
	Amount float64 `json:"amount"`
	Items []any `json:"items"`
}

type PaymentResponse struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}

var products = []Product{
	{ ID: 1, Name: "Klawiatura RGB", Price: 300, Description: "Świeci się na wszystkie kolory tęczy"},
	{ ID: 2, Name: "Myszka ergonomiczna", Price: 500, Description: "Śmiesznie się ją trzyma, tak pionowo"},
	{ ID: 3, Name: "Słuchawki bezprzewodowe", Price: 100, Description: "9 na 10 programistów je poleca"},
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func getProducts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(products); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func postPayments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req PaymentRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(PaymentResponse{
			Success: false, Message: "Wrong payment request format",
		}); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		return
	}

	if req.Amount > 0 {
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(PaymentResponse{
			Success: true, Message: "Payment realized successfully",
		}); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return			
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(PaymentResponse{
			Success: false, Message: "Payment error",
		}); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return			
		}
	}
}

func setupRouter() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/products", enableCORS(getProducts))
	mux.HandleFunc("/api/payments", enableCORS(postPayments))
	return mux
}

func main() {
	router := setupRouter()
	port := ":3001"
	fmt.Printf("Server availalbe at http://localhost%s\n", port)

	if err := http.ListenAndServe(port, router); err != nil {
		log.Fatal(err)
	}
}