import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Twój koszyk</h2>
      <p>Koszyk jest pusty</p>
      <h3>Suma: 0</h3>
      <button onClick={() => navigate("/payments")}>
        Przejdź do płatności
      </button>
    </div>
  );
};

export default Cart;
