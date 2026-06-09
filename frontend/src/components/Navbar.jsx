import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                padding: "15px 30px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div>
                <Link to="/">Jobs</Link>
            </div>

            <div style={{
                display: "flex",
                gap: "20px",
                alignItems: "center"
            }}>
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
            </div>
        </nav>
    );
}

export default Navbar;