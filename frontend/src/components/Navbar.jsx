import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-slate-900 text-white px-4 md:px-8 py-4">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                <h1 className="text-2xl font-bold">
                    Job Portal
                </h1>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">

                    <Link
                        to="/"
                        className="hover:text-blue-400"
                    >
                        Jobs
                    </Link>

                    <Link
                        to="/applications"
                        className="hover:text-blue-400"
                    >
                        Applications
                    </Link>

                    <Link
                        to="/profile"
                        className="hover:text-blue-400"
                    >
                        Profile
                    </Link>
                    <Link to="/dashboard" className="hover:text-blue-400">
                        Dashboard
                    </Link>

                    <button
                        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;