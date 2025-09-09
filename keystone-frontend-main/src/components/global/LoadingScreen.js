import React, { useEffect, useRef, useState } from "react";
import loadingAnimation from "../videos/loadingAnimation.mp4";
const LoadingScreen = ({ onFinish }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [moveLogo, setMoveLogo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const handleVideoEnd = () => {
      setShowLogo(true);
      setTimeout(() => {
        setMoveLogo(true);

        setTimeout(() => {
          onFinish();
        }, 1000);
      }, 100);
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [onFinish]);
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      onFinish();
    }, 20000);

    return () => clearTimeout(fallbackTimer);
  }, [onFinish]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (videoRef.current) {
        videoRef.current.muted = !prev;
      }
      return !prev;
    });
  };

  // Image is changed

  return (
    <div className="relative w-full h-screen bg-black flex justify-center items-center">
      {!showLogo && (
        <>
          <video
            ref={videoRef}
            src={
              // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884311/loadingAnimation_kkoipb.mp4"
              loadingAnimation
            }
            autoPlay
            playsInline
            muted={isMuted}
            className="absolute top-0 left-0 w-full h-full object-contain z-0 bg-black"
          />

          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-4xl text-white p-2 rounded"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </>
      )}

      {showLogo && (
        <img
          src={
            "/logo.png"
            // "https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884248/logo_emf5vr.png"
          }
          alt="Logo"
          className={`absolute transition-all duration-1000 ease-in-out ${
            moveLogo
              ? "top-4 left-4 h-10"
              : "top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2"
          }`}
        />
      )}
    </div>
  );
};

export default LoadingScreen;
