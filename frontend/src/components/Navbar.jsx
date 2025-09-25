import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/note.png" // replace with your own logo if needed
            alt="logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold">NoteKeeper</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${
                isActive ? "text-yellow-400 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${
                isActive ? "text-yellow-400 font-semibold" : ""
              }`
            }
          >
            Create Notes
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${
                isActive ? "text-yellow-400 font-semibold" : ""
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
