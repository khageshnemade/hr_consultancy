import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen pt-20">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
