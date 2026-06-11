import { useEffect, useState } from "react";
import axios from "axios";

function RecruiterDashboard() {

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
    });

    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://job-portal-mern-88c6.onrender.com/api/jobs/myjobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("MY JOBS:", res.data);

            setJobs(res.data.jobs || res.data || []);

        } catch (error) {
            console.log(error);
        }
    };

    const createJob = async () => {
        try {

            const token =
                localStorage.getItem("token");

            const res = await axios.post(
                "https://job-portal-mern-88c6.onrender.com/api/jobs/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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

            fetchMyJobs();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create job"
            );

            console.log(error);

        }
    };

    const deleteJob = async (jobId) => {
        try {

            const token =
                localStorage.getItem("token");

            await axios.delete(
                `https://job-portal-mern-88c6.onrender.com/api/jobs/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Job Deleted Successfully");

            fetchMyJobs();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }
    };
    const fetchApplicants = async (jobId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `https://job-portal-mern-88c6.onrender.com/api/applications/job/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setApplicants(res.data.applications);
            setSelectedJob(jobId);

        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (
        applicationId,
        status
    ) => {
        try {

            const token =
                localStorage.getItem("token");

            await axios.put(
                `https://job-portal-mern-88c6.onrender.com/api/applications/status/${applicationId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchApplicants(selectedJob);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-slate-100">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-2">
                    Recruiter Dashboard
                </h1>

                <p className="text-gray-600 mb-8">
                    Total Jobs Posted: {jobs.length}
                </p>

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

                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-6">
                        My Posted Jobs
                    </h2>

                    {jobs.length === 0 ? (

                        <div className="bg-white p-6 rounded-xl shadow">
                            No jobs posted yet
                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 gap-6">

                            {jobs.map((job) => (

                                <div
                                    key={job._id}
                                    className="bg-white p-6 rounded-xl shadow-lg"
                                >

                                    <h3 className="text-xl font-bold">
                                        {job.title}
                                    </h3>

                                    <p className="text-gray-600 mt-2">
                                        {job.company}
                                    </p>

                                    <p className="text-gray-600">
                                        📍 {job.location}
                                    </p>

                                    <p className="text-green-600 font-bold mt-2">
                                        ₹ {job.salary}
                                    </p>

                                    <p className="mt-3 text-gray-700">
                                        {job.description}
                                    </p>

                                    <div className="mt-4 flex gap-2 flex-wrap">

                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                            onClick={() =>
                                                fetchApplicants(job._id)
                                            }
                                        >
                                            View Applicants
                                        </button>

                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                            onClick={() =>
                                                deleteJob(job._id)
                                            }
                                        >
                                            Delete Job
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                {selectedJob && (

                    <div className="mt-12">

                        <h2 className="text-3xl font-bold mb-6">
                            Applicants
                        </h2>

                        {applicants.length === 0 ? (

                            <div className="bg-white p-6 rounded-xl shadow">
                                No applicants yet
                            </div>

                        ) : (

                            <div className="grid gap-4">

                                {applicants.map((app) => (

                                    <div
                                        key={app._id}
                                        className="bg-white p-6 rounded-xl shadow"
                                    >

                                        <h3 className="text-xl font-bold">
                                            {app.candidate?.name}
                                        </h3>

                                        <p className="text-gray-600">
                                            {app.candidate?.email}
                                        </p>

                                        <p className="mt-2">
                                            Status:
                                            <span className="font-bold ml-2">
                                                {app.status}
                                            </span>
                                        </p>

                                        <div className="mt-4 flex gap-3">

                                            <button
                                                className="bg-green-600 text-white px-4 py-2 rounded"
                                                onClick={() =>
                                                    updateStatus(
                                                        app._id,
                                                        "accepted"
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                                onClick={() =>
                                                    updateStatus(
                                                        app._id,
                                                        "rejected"
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default RecruiterDashboard;