import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load jobs");
    }
  };

  const applyJob = async (jobId) => {

    try {

      const app = {
        jobId: jobId,
        userEmail: user.email
      };

      const res = await API.post(
        "/applications/apply",
        app
      );

      alert(res.data);

    } catch (err) {

      alert("Application Failed");
    }
  };

  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(`/jobs/${id}`);

      alert("Job Deleted Successfully");

      fetchJobs();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");
    }
  };

  return (

    <div className="jobs-container">

      <h1>Available Jobs</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search Jobs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {
        jobs
          .filter((job) =>
            job.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((job) => (

            <div
              className="job-card"
              key={job.id}
            >

              <h3>{job.title}</h3>

              <p>
                <b>Company:</b> {job.company}
              </p>

              <p>
                <b>Location:</b> {job.location}
              </p>

              <p>
                <b>Salary:</b> {job.salary}
              </p>

              <br />

              <button
                onClick={() =>
                  applyJob(job.id)
                }
              >
                Apply
              </button>

              &nbsp;&nbsp;

              <button
                onClick={() =>
                  navigate(`/editjob/${job.id}`)
                }
              >
                Edit
              </button>

              &nbsp;&nbsp;

              <button
                onClick={() =>
                  deleteJob(job.id)
                }
              >
                Delete
              </button>

            </div>

          ))
      }

      <br />

      <button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Back To Dashboard
      </button>

      &nbsp;&nbsp;

      <button
        onClick={() =>
          navigate("/applications")
        }
      >
        My Applications
      </button>

    </div>

  );
}

export default Jobs;