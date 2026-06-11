import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-mern-88c6.onrender.comttp://localhost:5000/api/jobs"
      );

      setJobs(res.data.jobs);

      setLoading(false);

    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const applyJob = async (jobId) => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.post(
        "https://job-portal-mern-88c6.onrender.com/api/applications/apply",
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
  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading jobs...
      </div>
    );
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Available Jobs
      </h1>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 border p-3 rounded-lg mb-6"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredJobs.length === 0 ? (

          <div className="col-span-full text-center py-10">
            <h2 className="text-2xl font-bold">
              No Jobs Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search term
            </p>
          </div>

        ) : (

          filteredJobs.map((job) => (

            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold">
                {job.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {job.company}
              </p>

              <p className="text-gray-600">
                📍 {job.location}
              </p>

              <p className="text-green-600 font-bold mt-2">
                ₹ {job.salary}
              </p>

              <p className="mt-3">
                {job.description}
              </p>


              <div className="mt-4 flex gap-3">

                <Link
                  to={`/job/${job._id}`}
                  className="bg-slate-800 text-white px-4 py-2 rounded"
                >
                  View Details
                </Link>

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => applyJob(job._id)}
                >
                  Apply Now
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Jobs;