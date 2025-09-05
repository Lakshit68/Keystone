import clsx from "clsx";

const HeroSection = ({
  title = "",
  subtitle = "",
  description = "",
  backgroundVideo = "",
  className = "",
}) => {
  return (
    <section
      className={clsx(
        "relative text-white flex flex-col justify-center items-center text-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]",
        className
      )}
      style={{
        backgroundColor: "#000", // Unified black background
      }}
    >
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Unified overlay with consistent black background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-0" />

      {/* Content with improved responsiveness */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 border-white border-y-2 py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold mb-2 sm:mb-4">
          {title}
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-light mb-2 sm:mb-4">
          {subtitle}
        </h2>

        {description && (
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
