import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

const inputClass =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

function RecruiterDashboard() {
    const [formData, setFormData] = useState({
        title: "", company: "", location: "", salary: "", description: "",
    });
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [creating, setCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${API_BASE}/api/jobs`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setJobs(res.data.jobs || res.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const createJob = async () => {
        try {
            setCreating(true);
            const token = localStorage.getItem("token");
            await axios.post(
                `${API_BASE}/api/jobs/create`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFormData({ title: "", company: "", location: "", salary: "", description: "" });
            setShowForm(false);
            fetchMyJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create job");
        } finally {
            setCreating(false);
        }
    };

    const deleteJob = async (jobId) => {
        if (!confirm("Are you sure you want to delete this job?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                `${API_BASE}/api/jobs/${jobId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (selectedJob === jobId) {
                setSelectedJob(null);
                setApplicants([]);
            }
            fetchMyJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Delete Failed");
        }
    };

    const fetchApplicants = async (jobId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${API_BASE}/api/applications/job/${jobId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setApplicants(res.data.applications);
            setSelectedJob(jobId);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (applicationId, status) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${API_BASE}/api/applications/status/${applicationId}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchApplicants(selectedJob);
        } catch (error) {
            console.log(error);
        }
    };

    const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

    return (
        <div className="flex-1 bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Recruiter Dashboard</h1>
                            <p className="text-slate-500 text-sm mt-1">
                                {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
                            </p>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-colors"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Post a Job
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {showForm && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-base font-semibold text-slate-900 mb-5">New Job Posting</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title</label>
                                <input className={inputClass} placeholder="e.g. Frontend Developer" value={formData.title} onChange={set("title")} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                                <input className={inputClass} placeholder="Company name" value={formData.company} onChange={set("company")} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                                <input className={inputClass} placeholder="e.g. Bangalore, Remote" value={formData.location} onChange={set("location")} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Salary (₹)</label>
                                <input className={inputClass} placeholder="e.g. 8,00,000" value={formData.salary} onChange={set("salary")} />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                                <textarea
                                    className={inputClass}
                                    rows="4"
                                    placeholder="Describe the role, requirements, and responsibilities..."
                                    value={formData.description}
                                    onChange={set("description")}
                                />
                            </div>
                        </div>
                        <div className="mt-5 flex gap-3">
                            <button
                                onClick={createJob}
                                disabled={creating}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                            >
                                {creating ? "Posting..." : "Post Job"}
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {jobs.length === 0 && !showForm ? (
                    <div className="text-center py-16">
                        <svg className="text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-xl font-semibold text-slate-700">No jobs posted yet</h2>
                        <p className="text-slate-400 mt-1 text-sm">Click "Post a Job" to get started</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-5">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className={`bg-white rounded-xl border p-6 hover:shadow-md transition-all ${
                                    selectedJob === job._id ? "border-indigo-300 ring-1 ring-indigo-200" : "border-slate-200"
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                        <svg className="text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                        ₹{job.salary}
                                    </span>
                                </div>

                                <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
                                <p className="text-slate-500 text-sm mt-1">{job.company}</p>

                                <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-2">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    {job.location}
                                </div>

                                <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">{job.description}</p>

                                <div className="mt-5 flex gap-2">
                                    <button
                                        onClick={() => fetchApplicants(job._id)}
                                        className="flex-1 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-medium py-2 rounded-lg text-sm transition-colors"
                                    >
                                        View Applicants
                                    </button>
                                    <button
                                        onClick={() => deleteJob(job._id)}
                                        className="border border-red-200 text-red-500 hover:bg-red-50 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedJob && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-base font-semibold text-slate-900 mb-1">
                            Applicants
                            <span className="ml-2 text-slate-400 font-normal text-sm">({applicants.length})</span>
                        </h2>
                        <p className="text-slate-400 text-xs mb-5">For: {jobs.find(j => j._id === selectedJob)?.title}</p>

                        {applicants.length === 0 ? (
                            <p className="text-slate-400 text-sm text-center py-8">No applicants for this job yet</p>
                        ) : (
                            <div className="space-y-3">
                                {applicants.map((app) => (
                                    <div
                                        key={app._id}
                                        className="border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-sm">{app.candidate?.name}</h3>
                                            <p className="text-slate-500 text-sm">{app.candidate?.email}</p>
                                            <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                                                app.status === "accepted" ? "bg-emerald-50 text-emerald-700" :
                                                app.status === "rejected" ? "bg-red-50 text-red-600" :
                                                "bg-amber-50 text-amber-700"
                                            }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => updateStatus(app._id, "accepted")}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => updateStatus(app._id, "rejected")}
                                                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
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
