import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-900 text-white w-full mt-10">

            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col items-center justify-center">

                <Link
                    to="https://crazydevjs.github.io/crazydev.github.io/"
                    className="text-sm md:text-base font-medium text-center hover:text-blue-400 transition duration-200"
                >
                    Developer: Deepak Deodatt Mishrra
                </Link>

            </div>

        </footer>
    );
}

export default Footer;