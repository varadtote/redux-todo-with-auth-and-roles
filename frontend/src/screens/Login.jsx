import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("Login Result:", result);
      console.log("Response Headers:", result.headers);
      // Access the Set-Cookie header from the response headers
      const setCookieHeader = result.headers["set-cookie"];
      console.log("cookie Header", setCookieHeader);
      if (setCookieHeader) {
        // Extract and display the cookie values
        const cookieValues = setCookieHeader.map(
          (cookie) => cookie.split(";")[0]
        );
        console.log("Cookie Values:", cookieValues);
      }

      const cookieValues = setCookieHeader.map((cookie) => {
        const [value] = cookie.split(";");
        return value.trim();
      });
      console.log("Cookie Values:", cookieValues);

      // Display success message
      toast.success("Login successful!");

      // You can add your login logic here, such as updating UI or redirecting
    } catch (error) {
      console.error("Error during Login:", error);

      // Display error message
      toast.error(
        error.response.data.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back, Login
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
