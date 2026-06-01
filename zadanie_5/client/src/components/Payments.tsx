import apiClient from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Payments = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const handlePayment = async () => {
    try {
      const res = await apiClient.post("/payments", {
        amount: state.totalPrice,
        items: state.items.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
      });

      if (res.data.success) {
        clearCart();
        alert("Płatność została zrealizowana");
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Płatności</h1>

      {state.totalPrice > 0 ? (
        <div>
          <p>Należność: {state.totalPrice} PLN</p>
          <button style={{ margin: "10px" }} onClick={handlePayment}>
            Zapłać
          </button>
        </div>
      ) : (
        <p>Nie masz nic w koszyku.</p>
      )}
    </div>
  );
};

export default Payments;
