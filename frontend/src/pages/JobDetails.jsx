import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`
      );

      setJob(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">

        <h1 className="text-4xl font-extrabold text-slate-900">
          {job.title}
        </h1>

        <p className="mt-4 text-lg">
          🏢 {job.company}
        </p>

        <p className="mt-2">
          📍 {job.location}
        </p>

        <p className="mt-2 text-green-600 font-bold">
          ₹ {job.salary}
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          Description
        </h2>

        <p className="mt-2">
          {job.description}
        </p>

      </div>

    </div>
  );
}

export default JobDetails;