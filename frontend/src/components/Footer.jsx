import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Note Keeper. All rights reserved.
        </p>

        {/* Right side */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a href="/about" className="hover:text-white transition-colors">
            About
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
