import React from "react";
import errorLogo from "/error-404.png";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center px-4">
          <img
            src={errorLogo} 
            alt="appERROR"
            className="w-80 h-50 object-contain  mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Oops, page not found!
          </h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for is not available.
          </p>
          <Link
            to="/"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Go Back!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
