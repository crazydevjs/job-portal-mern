import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                padding: "15px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                gap: "20px",
            }}
        >
            <Link to="/">Jobs</Link>

            <Link to="/applications">
                My Applications
            </Link>

            <Link to="/profile">
                Profile
            </Link>
            <button
                onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;