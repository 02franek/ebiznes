package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetProductsAPI(t *testing.T) {
	router := setupRouter()

	t.Run("Successfully downloads a list of products", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/api/products", nil)
		rr := httptest.NewRecorder()

		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Expected status %v, received %v", http.StatusOK, rr.Code)
		}

		expectedContentType := "application/json"
		contentType := rr.Header().Get("Content-Type")
		if contentType != expectedContentType {
			t.Errorf("Expected header %v, received %v", expectedContentType, contentType)
		}

		var returnedProducts []Product
		if err := json.NewDecoder(rr.Body).Decode(&returnedProducts); err != nil {
			t.Fatalf("Error decoding JSON: %v", err)
		}

		if len(returnedProducts) != len(products) {
			t.Errorf("Expected %v products, received %v", len(returnedProducts), len(products))
		}

		firstProduct := returnedProducts[0]
		if firstProduct.ID != 1 {
			t.Errorf("Expected first product to have ID of 1, got ID of %v", firstProduct.ID)
		}
		if firstProduct.Price <= 0 {
			t.Errorf("Expected first product to have price greater than 0, got price of %v", firstProduct.Price)
		}
		if firstProduct.Name == "" {
			t.Errorf("Expected non-empty name of product")
		}
	})

	t.Run("Returns MethodNotAllowed for POST request", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/api/products", nil)
		rr := httptest.NewRecorder()

		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusMethodNotAllowed {
			t.Errorf("Expected status %v, received %v", http.StatusMethodNotAllowed, rr.Code)
		}
	})
}

func TestPostPaymentsAPI(t *testing.T) {
	router := setupRouter()

	t.Run("Successfully processes payment", func(t *testing.T) {
		payload := PaymentRequest{Amount: 213.70}
		body, _ := json.Marshal(payload)

		req := httptest.NewRequest(http.MethodPost, "/api/payments", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		rr := httptest.NewRecorder()

		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Expected status %v, received %v", http.StatusOK, rr.Code)
		}

		var response PaymentResponse
		json.NewDecoder(rr.Body).Decode(&response)

		if response.Success != true {
			t.Errorf("Expected success to be true, received %v", response.Success)
		}

		expectedMessage := "Payment realized successfully"
		if response.Message != expectedMessage {
			t.Errorf("Expected message '%v', received '%v'", expectedMessage, response.Message)
		}
	})

	t.Run("Doesn't process payments with negative or zero amount", func(t *testing.T) {
		payload := PaymentRequest{Amount: -1000}
		body, _ := json.Marshal(payload)
		
		req := httptest.NewRequest(http.MethodPost, "/api/payments", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		rr := httptest.NewRecorder()
		
		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusBadRequest {
			t.Errorf("Expected status %v, received %v", http.StatusBadRequest, rr.Code)
		}

		var response PaymentResponse
		json.NewDecoder(rr.Body).Decode(&response)

		if response.Success != false {
			t.Errorf("Expected success to be false, received %v", response.Success)
		}

		expectedMessage := "Payment error"
		if response.Message != expectedMessage {
			t.Errorf("Expected message '%v', received '%v'", expectedMessage, response.Message)
		}
	})
}