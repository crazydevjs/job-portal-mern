import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Job Portal
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400">
          Jobs
        </Link>

        <Link
          to="/applications"
          className="hover:text-blue-400"
        >
          My Applications
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-400"
        >
          Profile
        </Link>

        <button
          className="bg-red-500 px-4 py-2 rounded"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;