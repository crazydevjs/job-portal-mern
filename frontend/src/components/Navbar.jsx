import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path || (path === "/jobs" && location.pathname === "/");

    const NavLink = ({ to, label }) => (
        <Link
            to={to}
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium transition-colors ${
                isActive(to) ? "text-white" : "text-slate-400 hover:text-white"
            }`}
        >
            {label}
        </Link>
    );

    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/jobs" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">JobPortal</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-7">
                        <NavLink to="/jobs" label="Jobs" />
                        <NavLink to="/applications" label="Applications" />
                        <NavLink to="/profile" label="Profile" />
                        <NavLink to="/dashboard" label="Dashboard" />
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-1.5 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    <button
                        className="md:hidden text-slate-400 hover:text-white transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800 flex flex-col gap-4">
                        <NavLink to="/jobs" label="Jobs" />
                        <NavLink to="/applications" label="Applications" />
                        <NavLink to="/profile" label="Profile" />
                        <NavLink to="/dashboard" label="Dashboard" />
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-slate-300 hover:text-white border border-slate-700 px-4 py-2 rounded-lg text-left transition-colors w-fit"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
