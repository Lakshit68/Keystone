import React from "react";

const DescriptiveProfileCard = ({ imageSrc, role, name, description, key }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mx-auto items-center flex flex-col md:flex-row gap-6">
        <div
          className={`flex-shrink-0 md:w-1/3 ${
            name === "Marcie Cheney" ? "h-[400px]" : "h-[400px]"
          }`}
        >
          <img
            src={imageSrc}
            alt={name}
            className="rounded-lg w-full h-full object-cover object-top"
          />
        </div>

        <div className="md:w-2/3 flex flex-col">
          <div className="font-normal text-2xl leading-9 sm:text-3xl sm:leading-[40px] md:text-[32px] md:leading-[44px]">
            Meet Our
            <br />
            <strong>{role}</strong>
          </div>

          <h2 className="text-4xl leading-[44px] mt-2 mb-4 sm:text-5xl sm:leading-[56px] md:text-6xl md:leading-[64px] font-extrabold text-yellow-500 ">
            {name}
          </h2>

          {description?.slice(0, 2).map((para, index) => (
            <p
              key={index}
              className="text-[#313131] mb-2 text-base sm:text-xl leading-relaxed whitespace-pre-line"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
      {description?.slice(2, 5).map((para, index) => (
        <p
          key={index}
          className="text-gray-800 mb-2 text-base sm:text-xl leading-relaxed  whitespace-pre-line"
        >
          {para}
        </p>
      ))}
    </div>
  );
};

export default DescriptiveProfileCard;
