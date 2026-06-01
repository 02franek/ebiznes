import { useState } from "react";

function Payments() {
  const [amount, setAmount] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.status);
        setAmount("");
      })
      .catch((err) => console.error("Error with payment: ", err));
  };

  return (
    <div>
      <h1>Payments</h1>
      <form onSubmit={handlePayment}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount..."
          required
        />

        <button type="submit">Send payment</button>
      </form>
    </div>
  );
}

export default Payments;
