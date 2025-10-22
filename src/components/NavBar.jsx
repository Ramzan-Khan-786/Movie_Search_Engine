import React from "react";
  import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold text-blue-600 dark:text-white">
          <Link to="/">Movie App</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition duration-200"
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
