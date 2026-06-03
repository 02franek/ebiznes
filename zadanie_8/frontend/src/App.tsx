import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`Logged in user: ${data.user.email}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage("Error connecting to a server");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Logowanie do aplikacji</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "300px",
            gap: "1rem",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zaloguj się</button>
        </form>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
