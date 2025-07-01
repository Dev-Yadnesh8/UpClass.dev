import { FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-footer-Bg text-white py-16 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Brand & Tagline */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">UpClass.dev</h2>
          <p className="text-sm text-indigo-300">
            Built by developers, for creators.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 text-2xl">
          <a
            href="https://linkedin.com/in/yadnesh-narawade"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Dev-Yadnesh8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 text-center sm:text-right">
          © {new Date().getFullYear()} UpClass.dev • Built with ❤️ by Yadnesh
          Narawade
        </div>
      </div>
    </footer>
  );
}

export default Footer;
