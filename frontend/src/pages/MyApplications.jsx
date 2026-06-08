import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {

  const [applications,
    setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {

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
  };

  return (
    <div>

      <h1>
        My Applications
      </h1>

      {applications.map((app) => (

        <div key={app._id}>

          <h2>
            {app.job.title}
          </h2>

          <p>
            {app.status}
          </p>

        </div>

      ))}

    </div>
  );
}

export default MyApplications;