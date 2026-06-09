import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/applications/my",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setApplications(
          res.data.applications
        );

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading Applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Applications
        </h1>

        {applications.length === 0 ? (

          <div className="bg-white p-8 rounded-xl shadow text-center">

            <h2 className="text-2xl font-bold">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Apply for jobs to see them here.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {applications.map((app) => (

              <div
                key={app._id}
                className="bg-white p-6 rounded-xl shadow-lg"
              >

                <h2 className="text-2xl font-bold">
                  {app.job?.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {app.job?.company}
                </p>

                <p className="text-gray-600">
                  📍 {app.job?.location}
                </p>

                <div className="mt-4">

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    {app.status}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Applied on:
                  {" "}
                  {new Date(
                    app.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyApplications;