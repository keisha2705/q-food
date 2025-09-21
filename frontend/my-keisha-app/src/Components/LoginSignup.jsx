import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const styles = {
  authPage: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(1200px 800px at 80% -10%, #1b2130 0%, #9e5511ff 40%)",
    margin: 0,
    boxSizing: "border-box",
  },
};

function LoginSignup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin
        ? "http://localhost:3000/login"
        : "http://localhost:3000/signup";

      let headers = { "Content-Type": "application/json" };
      let body = JSON.stringify(formData);

      // 🔹 If logging in, use Basic Auth
      if (isLogin) {
        const credentials = btoa(`${formData.username}:${formData.password}`);
        headers["Authorization"] = `Basic ${credentials}`;
        body = null; // login doesn’t need a body
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();

      if (res.ok) {
        if (!isLogin) {
          // ✅ Signup success
          alert("Signup successful! Please log in.");
          setIsLogin(true);
          setFormData({ username: "", email: "", password: "" });
        } else {
          // ✅ Login success → save username in localStorage
          localStorage.setItem("username", formData.username);
          alert("Login successful!");
          navigate("/Homepage");
        }
      } else {
        alert(data.error || "Login/Signup failed");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <div className="container" style={styles.authPage}>
      <div className="image-side" />
      <div className="form-side">
        <h1 className="brand">Q-Foods</h1>
        <form onSubmit={handleSubmit}>
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
          <p>{isLogin ? "Welcome back!" : "Create your account"}</p>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Email only for signup */}
          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>

          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ username: "", email: "", password: "" });
              }}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
