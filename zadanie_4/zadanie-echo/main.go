package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

type Product struct {
	gorm.Model
	Name string `json:"name"`
	Price float32 `json:"price"`
}

func createProduct(c echo.Context) error {
	p := new(Product)
	if err := c.Bind(p); err != nil {
		return err
	}
	
	if result := db.Create(&p); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Error creating product",
		})
	}

	return c.JSON(http.StatusCreated, p)
}

func getProducts(c echo.Context) error {
	var products []Product

	if result := db.Find(&products); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Error loading products",
		})
	}
	
	return c.JSON(http.StatusOK, products)
}

func getProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var p Product

	if result := db.First(&p, id); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"message": "Product not found",
		})
	}
	
	return c.JSON(http.StatusOK, p)
}

func updateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var p Product

	if result := db.First(&p, id); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"message": "Product not found",
		})
	}

	if err := c.Bind(&p); err != nil {
		return err
	}

	db.Save(&p)
	return c.JSON(http.StatusOK, p)
}

func deleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var p Product

	if result := db.First(&p, id); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"message": "Product not found",
		})
	}

	db.Delete(&p, id)
	return c.NoContent(http.StatusNoContent)
}

func main() {
	var err error

	db, err = gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		panic("Couldn't establish connection with data base")
	}

	db.AutoMigrate(&Product{})

	e := echo.New()

	e.POST("/products", createProduct)
	e.GET("/products", getProducts)
	e.GET("/products/:id", getProduct)
	e.PUT("/products/:id", updateProduct)
	e.DELETE("/products/:id", deleteProduct)

	e.Logger.Fatal(e.Start(":8080"))
}
