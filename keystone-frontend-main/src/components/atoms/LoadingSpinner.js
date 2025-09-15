import React from 'react';

const LoadingSpinner = ({ message = "Loading...", size = "large" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12", 
    large: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      {/* Animated Spinner */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
        <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-pink-500 rounded-full animate-spin`} 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      {/* Loading Text with Animation */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{message}</h3>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

