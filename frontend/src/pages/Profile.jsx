import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  const [editing, setEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({
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

  const handleUpdate = async () => {
    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          ...formData,
          skills:
            formData.skills
              .split(",")
              .map((s) => s.trim()),
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated");

      setEditing(false);

      fetchProfile();

    } catch (error) {
      console.log(error);
    }
  };
  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
      setFormData({
        phone:
          res.data.user.phone || "",

        location:
          res.data.user.location || "",

        skills:
          res.data.user.skills?.join(", ") || "",

        bio:
          res.data.user.bio || "",



        linkedin:
          res.data.user.linkedin || "",

        github:
          res.data.user.github || "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>

            <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {user.role}
            </span>
          </div>

        </div>

        <hr className="my-8" />

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-50 p-5 rounded-xl">
            <h2 className="font-bold text-lg mb-3">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-200 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills added</p>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl">
            <h2 className="font-bold text-lg mb-3">
              Bio
            </h2>

            <p className="text-gray-600">
              {user.bio || "No bio added"}
            </p>
          </div>

        </div>
        <div className="mt-6 bg-slate-50 p-5 rounded-xl">

          <h2 className="font-bold text-lg mb-3 mt-6 bg-slate-50 p-5 rounded-xl shadow">
            Contact Information
          </h2>

          <p>📱 {user.phone || "Not Added"}</p>

          <p className="mt-2">
            📍 {user.location || "Not Added"}
          </p>

          <p className="mt-2">
            💻 {user.github ? (
              <a
                href={user.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                GitHub Profile
              </a>
            ) : (
              "Not Added"
            )}
          </p>

          <p className="mt-2">
            🔗 {user.linkedin ? (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                LinkedIn Profile
              </a>
            ) : (
              "Not Added"
            )}
          </p>

        </div>
        {editing && (

          <div className="mt-8 bg-slate-50 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
              Edit Profile
            </h2>

            <div className="grid gap-4">

              <input
                className="border p-3 rounded"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
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
                placeholder="Skills (comma separated)"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value,
                  })
                }
              />

              <textarea
                className="border p-3 rounded"
                placeholder="Bio"
                rows="4"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    linkedin: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    github: e.target.value,
                  })
                }
              />

              <button
                className="bg-green-600 text-white py-3 rounded"
                onClick={handleUpdate}
              >
                Save Profile
              </button>

            </div>

          </div>

        )}

        <div className="mt-8 flex flex-wrap gap-4">

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            onClick={() =>
              setEditing(!editing)
            }
          >
            {editing
              ? "Cancel"
              : "Edit Profile"}
          </button>

          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;