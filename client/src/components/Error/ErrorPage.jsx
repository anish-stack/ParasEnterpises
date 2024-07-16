import React from 'react';

const ErrorPage = ({ errorCode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="https://i.ibb.co/5sVvMxg/image.png" alt="Error" className="w-64 h-auto mb-8" />
      <h1 className="text-4xl font-bold mb-4">Error {errorCode || 404}</h1>
      <p className="text-lg mb-4">Oops! Something went wrong.</p>
      <p className="text-lg">Please try again later or contact support.</p>
    </div>
  );
};

export default ErrorPage;
