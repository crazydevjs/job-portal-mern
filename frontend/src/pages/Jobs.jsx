import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/jobs"
      );

      setJobs(res.data.jobs);

    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async (jobId) => {
  try {

    const token =
      localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/applications/apply",
      {
        jobId,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert("Applied Successfully");

    console.log(res.data);

  } catch (error) {

    alert(
      error.response?.data?.message
    );

  }
};

  return (
    <div>
      <h1>Available Jobs</h1>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h2>{job.title}</h2>

          <p>{job.company}</p>

          <p>{job.location}</p>

          <p>₹ {job.salary}</p>

          <p>{job.description}</p>
        </div>
      ))}
      <button
  onClick={() => applyJob(job._id)}
>
  Apply Now
</button>
    </div>
  );
}

export default Jobs;