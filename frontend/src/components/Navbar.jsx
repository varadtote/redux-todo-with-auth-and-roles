import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <Link
            to={"/"}
            className="text-gray-800 transition-colors duration-300
            transform dark:text-gray-200 mx-1.5
            sm:mx-6"
          >
            Home
          </Link>
          <Link
            to={"/todo"}
            className="border-b-2 border-transparent
            hover:text-gray-800 transition-colors duration-300 transform
            dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Notes
          </Link>
          <Link
            to={"/admin"}
            className="border-b-2 border-transparent
            hover:text-gray-800 transition-colors duration-300 transform
            dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Admin
          </Link>
          <Link
            to={"/login"}
            className="border-b-2 border-transparent
            hover:text-gray-800 transition-colors duration-300 transform
            dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Login
            </button>
          </Link>
          <Link
            to={"/register"}
            className="border-b-2 border-transparent
            hover:text-gray-800 transition-colors duration-300 transform
            dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            <button className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Regsiter
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
