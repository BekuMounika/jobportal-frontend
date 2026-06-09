import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "CANDIDATE"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {

    if (
      user.name.trim() === "" ||
      user.email.trim() === "" ||
      user.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await API.post(
        "/auth/register",
        user
      );

      alert(res.data);

      setUser({
        name: "",
        email: "",
        password: "",
        role: "CANDIDATE"
      });

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#64748b"
          }}
        >
          Register to access the Job Portal
        </p>

        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Full Name"
          onChange={handleChange}
        />

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

        <button onClick={register}>
          Register
        </button>

        <br /><br />

        <button
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>

      </div>

    </div>

  );
}

export default Register;