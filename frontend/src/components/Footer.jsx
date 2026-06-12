import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center flex-shrink-0">
                            <svg className="text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-white font-semibold text-sm">JobPortal</span>
                    </div>

                    <Link
                        target="_blank"
                        to="https://crazydevjs.github.io/crazydev.github.io/"
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        Built by Deepak Deodatt Mishrra
                    </Link>

                    <p className="text-slate-500 text-xs">© 2025 JobPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
