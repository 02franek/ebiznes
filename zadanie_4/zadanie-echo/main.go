package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

type Category struct {
	gorm.Model
	Name string `json:"name"`
}

type Product struct {
	gorm.Model
	Name string `json:"name"`
	Price float32 `json:"price"`
	CategoryID uint `json:"category_id"`
	Category Category `json:"category"`
}

type Cart struct {
	gorm.Model
	Products []Product `gorm:"many2many:cart_products;" json:"products"`
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

	if result := db.Preload("Category").Find(&products); result.Error != nil {
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


func createCart(c echo.Context) error {
	cart := new(Cart)
	if result := db.Create(&cart); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Error creating cart",
		})
	}
	return c.JSON(http.StatusCreated, cart)
}

func getCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var cart Cart

	if result := db.Preload("Products").First(&cart, id); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"message": "Cart not found",
		})
	}
	return c.JSON(http.StatusOK, cart)
}

func addProductToCart(c echo.Context) error {
	cartID, _ := strconv.Atoi(c.Param("id"))
	productID, _ := strconv.Atoi(c.Param("product_id"))

	var cart Cart
	var product Product

	if result := db.First(&cart, cartID); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"message": "Cart not found",
		})
	}

	if result := db.First(&product, productID); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"message": "Product not found",
		})
	}

	err := db.Model(&cart).Association("Products").Append(&product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Couldn't add product to the cart",
		})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Proudct added to the cart"})
}


func createCategory(c echo.Context) error {
	category := new(Category)
	if err := c.Bind(category); err != nil {
		return err
	}
	if result := db.Create(&category); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Error creating category",
		})
	}
	return c.JSON(http.StatusCreated, category)
}


func main() {
	var err error

	db, err = gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		panic("Couldn't establish connection with data base")
	}

	db.AutoMigrate(&Product{}, &Cart{}, &Category{})

	e := echo.New()

	e.POST("/products", createProduct)
	e.GET("/products", getProducts)
	e.GET("/products/:id", getProduct)
	e.PUT("/products/:id", updateProduct)
	e.DELETE("/products/:id", deleteProduct)

	e.POST("/carts", createCart)
	e.GET("/carts/:id", getCart)
	e.POST("/carts/:id/products/:product_id", addProductToCart)

	e.POST("/categories", createCategory)

	e.Logger.Fatal(e.Start(":8080"))
}
