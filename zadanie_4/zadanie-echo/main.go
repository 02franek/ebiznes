package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type Product struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Price float32 `json:"price"`
}

var (
	products = map[int]*Product{}
	nextID = 1
)

func createProduct(c echo.Context) error {
	p := new(Product)
	if err := c.Bind(p); err != nil {
		return err
	}
	p.ID = nextID
	products[nextID] = p
	nextID++
	return c.JSON(http.StatusCreated, p)
}

func getProducts(c echo.Context) error {
	list := make([]*Product, 0, len(products))
	for _, p := range products {
		list = append(list, p)
	}
	return c.JSON(http.StatusOK, list)
}

func getProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if p, ok := products[id]; ok {
		return c.JSON(http.StatusOK, p)
	}
	return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
}

func updateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if p, ok := products[id]; ok {
		if err := c.Bind(p); err != nil {
			return err
		}
		p.ID = id
		return c.JSON(http.StatusOK, p)
	}
	return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
}

func deleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if _, ok := products[id]; ok {
		delete(products, id)
		return c.NoContent(http.StatusNoContent)
	}
	return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
}

func main() {
	e := echo.New()

	e.POST("/products", createProduct)
	e.GET("/products", getProducts)
	e.GET("/products/:id", getProduct)
	e.PUT("/products/:id", updateProduct)
	e.DELETE("/products/:id", deleteProduct)

	e.Logger.Fatal(e.Start(":8080"))
}
