import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2E8C6", // soft cream
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "360px",
          padding: "35px 40px",
          borderRadius: "15px",
          backgroundColor: "white",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#800000",
            fontSize: "1.8rem",
            marginBottom: "5px",
          }}
        >
          Login
        </h2>

        {error && (
          <p style={{ color: "#982B1C", fontSize: "14px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            fontSize: "15px",
            borderRadius: "8px",
            border: "1px solid #DAD4B5",
            outline: "none",
          }}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            fontSize: "15px",
            borderRadius: "8px",
            border: "1px solid #DAD4B5",
            outline: "none",
          }}
          required
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#800000",
            color: "#F2E8C6",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#982B1C")}
          onMouseOut={(e) => (e.target.style.background = "#800000")}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#444",
            marginTop: "5px",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{
              color: "#800000",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
