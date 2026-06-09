import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function EditJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load job details");
      }
    };

    loadJob();
  }, [id]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const updateJob = async () => {
    if (
      !job.title ||
      !job.company ||
      !job.location ||
      !job.salary ||
      !job.description
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.put(`/jobs/${id}`, job);

      alert("✅ Job Updated Successfully");

      navigate("/jobs");
    } catch (error) {
      console.error(error);
      alert("❌ Update Failed");
    }
  };

  return (
    <div className="job-form">
      <h1>✏️ Edit Job</h1>

      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          marginBottom: "20px"
        }}
      >
        Update job information below
      </p>

      <input
        type="text"
        name="title"
        value={job.title}
        placeholder="Job Title"
        onChange={handleChange}
      />

      <input
        type="text"
        name="company"
        value={job.company}
        placeholder="Company Name"
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        value={job.location}
        placeholder="Location"
        onChange={handleChange}
      />

      <input
        type="text"
        name="salary"
        value={job.salary}
        placeholder="Salary"
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={job.description}
        placeholder="Job Description"
        rows="6"
        onChange={handleChange}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        <button onClick={updateJob}>
          Update Job
        </button>

        <button
          onClick={() => navigate("/jobs")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditJob;