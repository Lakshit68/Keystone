import { Link } from "react-router-dom";

const InfoCard = ({
  title,
  anothertitle,
  description = [],
  imageSrc,
  imageAlt = "Info Image",
  index = 0,
  linktext,
}) => {
  const floatDirection =
    index % 2 === 0 ? "float-left mr-6" : "float-right ml-6";

  return (
    <div className="w-11/12 mx-auto clear-both flex flex-col gap-2 mt-6">
      {/* Title Only */}
      {title && !linktext && (
        <h3 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4 text-center sm:text-left">
          {title}
        </h3>
      )}
  
      {anothertitle && (
        <h3 className="text-base sm:text-xl font-semibold mb-2 text-left">
          {anothertitle}
        </h3>
      )}

      {/* Title with Link */}
      {title && linktext && (
        <div className="flex flex-col items-start mb-4">
          <Link
            to={linktext}
            target="_blank"
            className="text-3xl sm:text-4xl font-bold text-yellow-500 hover:underline"
          >
            {title}
          </Link>
          <Link
            to={linktext}
            target="_blank"
            className="text-base sm:text-lg font-semibold text-yellow-500 hover:underline"
          >
            {linktext}
          </Link>
        </div>
      )}

      {/* Image + Description */}
      <div className="overflow-hidden">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-[30rem] max-w-full h-auto mb-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 ${floatDirection}`}
          />
        )}

        {/* Description */}
        {/* {Array.isArray(description) &&
          description.map((para, idx) => (
            <p
              key={idx}
              className="text-[#313131] text-base sm:text-xl leading-relaxed mb-3"
            >
              <span className="text-base sm:text-xl font-semibold mb-4 text-left">
                {anothertitle}:&nbsp;
              </span>
              {para}
            </p>
          ))} */}

        {Array.isArray(description) &&
          description.map((para, idx) => (
            <p
              key={idx}
              className="text-[#313131] text-base sm:text-xl leading-relaxed mb-3"
            >
              {/* {anothertitle && idx === 0 && (
                <span className="text-base sm:text-xl font-semibold text-left">
                  {anothertitle}:&nbsp;
                </span>
              )} */}
              {para}
            </p>
          ))}
      </div>
    </div>
  );
};

export default InfoCard;
