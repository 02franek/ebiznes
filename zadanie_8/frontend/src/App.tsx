import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setLoggedInUser(data.user.email);
        }
      } catch {
        console.error("No active session");
      }
    };
    checkSession();
  }, []);

  const handleLocalSubmit = async (e: React.SubmitEvent, isLogin: boolean) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );
      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          setLoggedInUser(data.user.email);
          setMessage("");
        } else {
          setMessage(data.message);
          setIsRegistering(false);
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage("Error connecting to a server");
    }
  };

  const handleGoogleLogin = () => {
    globalThis.location.href = "http://localhost:5000/api/auth/google";
  };

  if (loggedInUser) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Zalogowano jako: {loggedInUser}</h2>
        <button
          onClick={() => {
            document.cookie = "token=; Max-Age=0; path=/;";
            setLoggedInUser(null);
          }}
        >
          Wyloguj
        </button>
      </div>
    );
  }

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
          onSubmit={(e) => handleLocalSubmit(e, !isRegistering)}
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

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={handleGoogleLogin}
            style={{
              padding: "0.25rem",
              backgroundColor: "#062fe4",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Zaloguj się przez Google
          </button>
        </div>

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
