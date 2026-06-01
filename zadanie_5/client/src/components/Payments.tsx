import { useState } from "react";
import apiClient from "../api/axiosConfig";

const Payments = () => {
  const [status, setStatus] = useState<string>("");

  const handlePayment = async () => {
    try {
      const res = await apiClient.post("/payments", {
        amount: 100,
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 3 },
        ],
      });

      if (res.data.success) {
        setStatus("Płatność została zrealizowana.");
      }
    } catch (e) {
      setStatus("Błąd płatności.");
      console.error(e);
    }
  };

  return (
    <div>
      <h2>Płatności</h2>
      <p>Należność: 100</p>
      <button onClick={handlePayment}>Zapłać</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Payments;
