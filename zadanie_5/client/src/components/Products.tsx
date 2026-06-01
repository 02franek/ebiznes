import { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";
import { type Product } from "../types";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    apiClient
      .get<Product[]>("/products")
      .then((res) => setProducts(res.data))
      .catch((e) => console.error("Error fetching products: ", e));
  }, []);

  return (
    <div>
      <h2>Produkty</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Cena: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
