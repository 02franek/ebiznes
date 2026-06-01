import { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";
import { type Product } from "../types";
import { useCart } from "../context/CartContext";

const Products = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    apiClient
      .get<Product[]>("/products")
      .then((res) => setProducts(res.data))
      .catch((e) => console.error("Error fetching products: ", e));
  }, []);

  return (
    <div>
      <h1>Produkty</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>
              <span>
                <span>
                  {product.name} - {product.price} PLN
                </span>
                <button
                  onClick={() => addItem(product)}
                  style={{ margin: "10px" }}
                >
                  Dodaj do koszyka
                </button>
              </span>
            </h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
