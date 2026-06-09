import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {

    if (
      user.email.trim() === "" ||
      user.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await API.post(
        "/auth/login",
        user
      );

      if (!res.data) {
        alert("Invalid Email or Password");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      alert("Login Failed");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Welcome Back</h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#64748b"
          }}
        >
          Login to continue to Job Portal
        </p>

        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={login}>
          Login
        </button>

        <br /><br />

        <button
          onClick={() => navigate("/")}
        >
          Create New Account
        </button>

      </div>

    </div>
  );
}

export default Login;