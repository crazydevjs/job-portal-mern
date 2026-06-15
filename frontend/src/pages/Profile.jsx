import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";

const inputClass =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    skills: "",
    bio: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE}/api/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setFormData({
        phone: res.data.user.phone || "",
        location: res.data.user.location || "",
        skills: res.data.user.skills?.join(", ") || "",
        bio: res.data.user.bio || "",
        linkedin: res.data.user.linkedin || "",
        github: res.data.user.github || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE}/api/users/profile`,
        { ...formData, skills: formData.skills.split(",").map((s) => s.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-indigo-200 text-sm mt-0.5">{user.email}</p>
                <span className="inline-block mt-2 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="border border-slate-200 rounded-xl p-5">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No skills added</p>
                  )}
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-5">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Bio</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{user.bio || "No bio added"}</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <svg className="text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {user.phone || <span className="text-slate-400">Not added</span>}
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <svg className="text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location || <span className="text-slate-400">Not added</span>}
                </div>

                <div className="flex items-center gap-3">
                  <svg className="text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {user.github ? (
                    <a href={user.github} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm">
                      GitHub Profile
                    </a>
                  ) : (
                    <span className="text-slate-400">Not added</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <svg className="text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {user.linkedin ? (
                    <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm">
                      LinkedIn Profile
                    </a>
                  ) : (
                    <span className="text-slate-400">Not added</span>
                  )}
                </div>
              </div>
            </div>

            {editing && (
              <div className="border border-slate-200 rounded-xl p-5">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">Edit Profile</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                    <input className={inputClass} placeholder="+91 98765 43210" value={formData.phone} onChange={set("phone")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                    <input className={inputClass} placeholder="City, State" value={formData.location} onChange={set("location")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Skills (comma separated)</label>
                    <input className={inputClass} placeholder="React, Node.js, Python" value={formData.skills} onChange={set("skills")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                    <textarea className={inputClass} rows="3" placeholder="Tell us about yourself..." value={formData.bio} onChange={set("bio")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">LinkedIn URL</label>
                    <input className={inputClass} placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={set("linkedin")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">GitHub URL</label>
                    <input className={inputClass} placeholder="https://github.com/..." value={formData.github} onChange={set("github")} />
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={() => { localStorage.clear(); navigate("/login"); }}
                className="border border-red-200 text-red-600 hover:bg-red-50 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
