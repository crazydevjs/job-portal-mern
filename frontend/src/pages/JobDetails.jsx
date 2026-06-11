import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://job-portal-mern-88c6.onrender.com/api/jobs/${id}`
      );

      console.log("API RESPONSE:", res.data);

      // 🔥 SAFE HANDLING
      setJob(res.data.job || res.data);

    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center mt-10">
        Job not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p>🏢 {job.company}</p>
        <p>📍 {job.location}</p>
        <p>₹ {job.salary}</p>

        <p className="mt-4">{job.description}</p>

      </div>
    </div>
  );
}

export default JobDetails;