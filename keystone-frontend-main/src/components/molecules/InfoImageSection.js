import { useNavigate } from "react-router-dom";

const InfoImageSection = ({
  title = "",
  imageSrc,
  imageAlt = "",
  content = [],
  link,
  size = "250px",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative cursor-pointer"
      style={{ width: size, height: size, perspective: "1000px" }}
      onClick={() => {
        navigate(link);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }}
    >
      <div
        className="w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute w-full h-full rounded-full overflow-hidden shadow-lg bg-cover bg-center text-white flex items-center justify-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backfaceVisibility: "hidden",
            transition: "transform 0.7s",
            transform: "rotateY(0deg)",
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0 rounded-full" />
          <h2 className="relative z-10 p-4 text-center text-base sm:text-lg md:text-lg font-bold">
            {title}
          </h2>
        </div>

        {/* BACK SIDE (same as front) */}
        <div
          className="absolute w-full h-full rounded-full overflow-hidden shadow-lg bg-cover bg-center text-white flex items-center justify-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transition: "transform 0.7s",
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0 rounded-full" />
          <h2 className="relative z-10 p-4 text-center text-base sm:text-lg md:text-lg font-bold">
            {title}
          </h2>
        </div>

        {/* HOVER FLIP STYLE */}
        <style>{`
          .group:hover > div {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </div>
  );
};

export default InfoImageSection;
