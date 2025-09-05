import React from "react";

export default function TwoSidedSection({
  image,
  title,
  description = [],
  imagePosition = "left",
  className = "",
}) {
  return (
    <div className={` w-11/12 sm:p-6 mx-auto ${className}`}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center ${
          imagePosition === "right" ? "lg:grid-flow-col-dense" : ""
        }`}
      >
        <div className={`${imagePosition === "right" ? "lg:col-start-2" : ""}`}>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-[350px] object-cover object-top"
            />
          </div>
        </div>

        <div
          className={`space-y-6 sm:col-span-2 ${
            imagePosition === "right" ? "lg:col-start-1" : ""
          }`}
        >
          {title && (
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed">
              {title}
            </h2>
          )}
          {description.map((para, idx) => (
            <p
              key={idx}
              className="text-[#313131] text-base sm:text-xl leading-relaxed whitespace-pre-line"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
