import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="profile-card">

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px"
        }}
      >
        <h1>👤 My Profile</h1>

        <p
          style={{
            color: "#64748b"
          }}
        >
          Manage your account information
        </p>
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "20px",
          borderRadius: "12px"
        }}
      >

        <p>
          <strong>Full Name:</strong>
          <br />
          {user?.name}
        </p>

        <br />

        <p>
          <strong>Email Address:</strong>
          <br />
          {user?.email}
        </p>

        <br />

        <p>
          <strong>Role:</strong>
          <br />
          {user?.role}
        </p>

      </div>

      <div
        style={{
          marginTop: "25px",
          textAlign: "center"
        }}
      >

        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back To Dashboard
        </button>

      </div>

    </div>

  );
}

export default Profile;