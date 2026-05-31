package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("Could not connect to test data base")
	}
	db.Migrator().DropTable(&Category{}, &Product{}, &Cart{})
	db.AutoMigrate(&Category{}, &Product{}, &Cart{})
}

/* 
 * Unit tests are AI generated
 */

func TestCreateCategory(t *testing.T) {
	setupTestDB()
	e := echo.New()

	reqBody := `{"name":"Electronics"}`
	req := httptest.NewRequest(http.MethodPost, "/categories", bytes.NewBufferString(reqBody))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	err := createCategory(c)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, rec.Code)
	assert.Contains(t, rec.Body.String(), "Electronics")
}

func TestCreateProduct(t *testing.T) {
	setupTestDB()
	e := echo.New()

	category := Category{Name: "Books"}
	db.Create(&category)

	productReq := map[string]interface{}{
		"name":        "The Witcher",
		"price":       35.50,
		"category_id": category.ID,
	}
	reqBytes, _ := json.Marshal(productReq)

	req := httptest.NewRequest(http.MethodPost, "/products", bytes.NewBuffer(reqBytes))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	err := createProduct(c)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, rec.Code)
	assert.Contains(t, rec.Body.String(), "The Witcher")
}

func TestGetProducts(t *testing.T) {
	setupTestDB()
	e := echo.New()

	category := Category{Name: "Hardware"}
	db.Create(&category)
	db.Create(&Product{Name: "Monitor", Price: 200.0, CategoryID: category.ID})
	db.Create(&Product{Name: "Mouse", Price: 25.0, CategoryID: category.ID})

	req := httptest.NewRequest(http.MethodGet, "/products", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	err := getProducts(c)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Contains(t, rec.Body.String(), "Monitor")
	assert.Contains(t, rec.Body.String(), "Mouse")
}

func TestUpdateProduct(t *testing.T) {
	setupTestDB()
	e := echo.New()

	product := Product{Name: "Old Name", Price: 10.0}
	db.Create(&product)

	updateReq := map[string]interface{}{
		"name":  "New Name",
		"price": 15.0,
	}
	reqBytes, _ := json.Marshal(updateReq)

	req := httptest.NewRequest(http.MethodPut, "/products/1", bytes.NewBuffer(reqBytes))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetParamNames("id")
	c.SetParamValues("1")

	err := updateProduct(c)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Contains(t, rec.Body.String(), "New Name")
	assert.Contains(t, rec.Body.String(), "15")
}

func TestDeleteProduct(t *testing.T) {
	setupTestDB()
	e := echo.New()

	product := Product{Name: "To Be Deleted", Price: 5.0}
	db.Create(&product)

	req := httptest.NewRequest(http.MethodDelete, "/products/1", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetParamNames("id")
	c.SetParamValues("1")

	err := deleteProduct(c)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusNoContent, rec.Code)

	var count int64
	db.Model(&Product{}).Where("id = ?", 1).Count(&count)
	assert.Equal(t, int64(0), count)
}

func TestCreateCart(t *testing.T) {
	setupTestDB()
	e := echo.New()

	req := httptest.NewRequest(http.MethodPost, "/carts", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	err := createCart(c)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, rec.Code)
}

func TestAddProductToCart(t *testing.T) {
	setupTestDB()
	e := echo.New()

	cart := Cart{}
	db.Create(&cart)
	product := Product{Name: "Laptop", Price: 1000.0}
	db.Create(&product)

	req := httptest.NewRequest(http.MethodPost, "/carts/1/products/1", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetParamNames("id", "product_id")
	c.SetParamValues("1", "1")

	err := addProductToCart(c)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)

	var updatedCart Cart
	db.Preload("Products").First(&updatedCart, 1)
	assert.Equal(t, 1, len(updatedCart.Products))
	assert.Equal(t, "Laptop", updatedCart.Products[0].Name)
}