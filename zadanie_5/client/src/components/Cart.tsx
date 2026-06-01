import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { state, removeItem, clearCart } = useCart();
  return (
    <div>
      <h1>Twój koszyk</h1>
      {state.items.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <div>
          {state.items.map((item) => (
            <div style={{ padding: "10px" }} key={item.product.id}>
              <span>
                {item.product.name} - {item.quantity} szt. (
                {item.product.price * item.quantity} PLN)
              </span>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => removeItem(item.product.id)}
              >
                Usuń z koszyka
              </button>
            </div>
          ))}

          <button
            style={{ margin: "10px" }}
            onClick={() => navigate("/payments")}
          >
            Przejdź do płatności
          </button>
          <button style={{ margin: "10px" }} onClick={() => clearCart()}>
            Usuń wszystkie przedmioty z koszyka
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
