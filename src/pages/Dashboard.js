import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [profileStatus, setProfileStatus] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const jobsRes = await API.get("/jobs");
        setTotalJobs(jobsRes.data.length);

        if (user?.email) {
          const appRes = await API.get(
            `/applications/${user.email}`
          );

          setTotalApplications(
            appRes.data.length
          );
        }

        let completed = 0;

        if (user?.name) completed++;
        if (user?.email) completed++;
        if (user?.role) completed++;

        setProfileStatus(
          Math.round((completed / 3) * 100)
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboardData();
  }, [user]);

  const logout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>💼 Job Portal</h2>

        <hr />

        <p onClick={() => navigate("/dashboard")}>
          🏠 Dashboard
        </p>

        <p onClick={() => navigate("/jobs")}>
          💼 View Jobs
        </p>

        <p onClick={() => navigate("/applications")}>
          📄 Applications
        </p>

        <p onClick={() => navigate("/addjob")}>
          ➕ Post Job
        </p>

        <p onClick={() => navigate("/profile")}>
          👤 Profile
        </p>

        <p onClick={logout}>
          🚪 Logout
        </p>
      </div>

      <div className="main-content">
        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1e40af)",
            color: "white",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "25px"
          }}
        >
          <h1>
            Welcome Back, {user?.name || "Candidate"} 👋
          </h1>

          <p>
            Manage jobs, applications and profile from
            your dashboard.
          </p>
        </div>

        <div className="cards">
          <div className="card">
            <h3>📌 Total Jobs</h3>

            <h2>{totalJobs}</h2>

            <p>
              Available jobs in portal
            </p>
          </div>

          <div className="card">
            <h3>📄 Applications</h3>

            <h2>{totalApplications}</h2>

            <p>
              Jobs applied by you
            </p>
          </div>

          <div className="card">
            <h3>⭐ Profile Status</h3>

            <h2>{profileStatus}%</h2>

            <p>
              Profile completed
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            width: "100%",
            marginTop: "25px"
          }}
        >
          <h3>👤 User Information</h3>

          <br />

          <p>
            <strong>Name:</strong>{" "}
            {user?.name || "Not Updated"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role}
          </p>
        </div>

        <div
          className="card"
          style={{
            width: "100%",
            marginTop: "25px"
          }}
        >
          <h3>⚡ Quick Actions</h3>

          <br />

          <button
            onClick={() => navigate("/jobs")}
          >
            Browse Jobs
          </button>

          &nbsp;&nbsp;

          <button
            onClick={() =>
              navigate("/applications")
            }
          >
            Applications
          </button>

          &nbsp;&nbsp;

          <button
            onClick={() =>
              navigate("/addjob")
            }
          >
            Post Job
          </button>

          &nbsp;&nbsp;

          <button
            onClick={() =>
              navigate("/profile")
            }
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;