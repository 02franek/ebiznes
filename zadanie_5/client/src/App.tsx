import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Payments from "./components/Payments";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Produkty</Link>
        <Link to="/payments">Płatności</Link>
        <Link to="/cart">Koszyk</Link>
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
