import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Payments from "./components/Payments";
import Cart from "./components/Cart";
import { useCart } from "./context/CartContext";

function App() {
  const { state } = useCart();

  return (
    <BrowserRouter>
      <nav style={{ padding: "20px" }}>
        <Link style={{ padding: "10px" }} to="/">
          Produkty
        </Link>
        <Link style={{ padding: "10px" }} to="/payments">
          Płatności
        </Link>
        <Link style={{ padding: "10px" }} to="/cart">
          Koszyk ({state.totalPrice} PLN)
        </Link>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
