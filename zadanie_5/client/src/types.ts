export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
