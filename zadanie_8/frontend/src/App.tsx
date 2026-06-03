import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: React.SubmitEvent) => {
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

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setIsRegistering(false);
        setPassword("");
      } else {
        setMessage(`Registration error: ${data.error}`);
      }
    } catch {
      setMessage("Error connecting to a server");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{isRegistering ? "Rejestracja" : "Logowanie"}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
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
          <button type="submit">
            {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
          </button>
        </form>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMessage("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "cyan",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {isRegistering
              ? "Masz już konto? Zaloguj się"
              : "Nie masz konta? Zarejestruj się"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
