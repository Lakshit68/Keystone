import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieChoice");
    if (!cookieChoice) {
      setShowAlert(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieChoice", "accepted");
    setShowAlert(false);
    // You can add analytics tracking here
    console.log("Cookies accepted");
  };

  const handleReject = () => {
    localStorage.setItem("cookieChoice", "rejected");
    setShowAlert(false);
    // You can add logic to disable non-essential cookies here
    console.log("Cookies rejected");
  };

  if (!showAlert) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Cookie Message */}
          <div className="flex-1">
            <p className="text-sm md:text-base leading-relaxed">
              🍪 We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By accepting cookies, you'll enjoy a better, more personalized experience with faster loading times 
              and relevant content tailored just for you.{" "}
              <Link 
                to="/terms" 
                className="text-yellow-400 hover:text-yellow-300 underline font-medium"
              >
                Learn more in our Privacy Policy
              </Link>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
            <button
              onClick={handleReject}
              className="px-6 py-2 bg-transparent border border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors duration-200 text-sm font-medium"
            >
              Reject All
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md transition-colors duration-200 text-sm"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieAlert;
