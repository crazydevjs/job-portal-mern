import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

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
              <span className="bg-slate-200 px-3 py-1 rounded-full">
                React
              </span>

              <span className="bg-slate-200 px-3 py-1 rounded-full">
                Node.js
              </span>

              <span className="bg-slate-200 px-3 py-1 rounded-full">
                MongoDB
              </span>

              <span className="bg-slate-200 px-3 py-1 rounded-full">
                JavaScript
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl">
            <h2 className="font-bold text-lg mb-3">
              Bio
            </h2>

            <p className="text-gray-600">
              Aspiring Full Stack Developer passionate
              about building scalable web applications
              using the MERN stack.
            </p>
          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Edit Profile
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