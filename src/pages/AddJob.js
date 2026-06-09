import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import "../App.css";

function AddJob() {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const addJob = async () => {

    if (
      job.title.trim() === "" ||
      job.company.trim() === "" ||
      job.location.trim() === "" ||
      job.salary.trim() === "" ||
      job.description.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post(
        "/jobs",
        job
      );

      alert("🎉 Job Added Successfully");

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
      });

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("❌ Failed To Add Job");
    }
  };

  return (

    <div className="job-form">

      <h1>💼 Post New Job</h1>

      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          marginBottom: "20px"
        }}
      >
        Create a new job opportunity for candidates
      </p>

      <input
        type="text"
        name="title"
        value={job.title}
        placeholder="Job Title (Java Developer)"
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
        placeholder="Salary Package"
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={job.description}
        placeholder="Enter Job Description..."
        rows="6"
        onChange={handleChange}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "15px"
        }}
      >

        <button onClick={addJob}>
          Post Job
        </button>

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

export default AddJob;