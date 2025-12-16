import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[99vh] flex flex-col justify-center items-center bg-green-50">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
      </div>

      <p className="mt-4 text-gray-700 text-lg font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
