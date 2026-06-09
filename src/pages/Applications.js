import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Applications() {

  const [apps, setApps] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {

    try {

      const res = await API.get(
        `/applications/${user.email}`
      );

      setApps(res.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load applications");
    }
  };

  return (

    <div className="jobs-container">

      <h1>My Applications</h1>

      {
        apps.length === 0 ? (

          <div className="application-card">

            <h3>No Applications Found</h3>

            <p>
              You have not applied to any jobs yet.
            </p>

          </div>

        ) : (

          apps.map((app) => (

            <div
              key={app.id}
              className="application-card"
            >

              <h3>
                Application #{app.id}
              </h3>

              <p>
                <strong>Job ID:</strong> {app.jobId}
              </p>

              <p>
                <strong>Status:</strong> {app.status}
              </p>

              <p>
                <strong>Email:</strong> {app.userEmail}
              </p>

            </div>

          ))
        )
      }

      <br />

      <button
        onClick={() =>
          navigate("/jobs")
        }
      >
        Back To Jobs
      </button>

      &nbsp;&nbsp;

      <button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Dashboard
      </button>

    </div>

  );
}

export default Applications;