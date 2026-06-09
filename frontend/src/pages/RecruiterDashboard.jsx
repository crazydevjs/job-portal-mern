import { useState } from "react";
import axios from "axios";

function RecruiterDashboard() {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const createJob = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/jobs/create",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Job Created Successfully");

      console.log(res.data);

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create job"
      );

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-100">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Recruiter Dashboard
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            Create New Job
          </h2>

          <div className="grid gap-4">

            <input
              className="border p-3 rounded"
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />

            <input
              className="border p-3 rounded"
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value,
                })
              }
            />

            <input
              className="border p-3 rounded"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
            />

            <input
              className="border p-3 rounded"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: e.target.value,
                })
              }
            />

            <textarea
              className="border p-3 rounded"
              rows="4"
              placeholder="Job Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

            <button
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              onClick={createJob}
            >
              Create Job
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RecruiterDashboard;