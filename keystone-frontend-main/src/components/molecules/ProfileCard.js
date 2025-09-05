const ProfileCard = ({ imageSrc, altText, name, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden  w-full  mx-auto">
      <img
        className="w-full h-80 object-cover object-top"
        src={imageSrc}
        alt={altText}
      />
      <div className="p-4">
        <p className="text-base leading-6 sm:text-lg sm:leading-7 md:text-xl md:leading-8 font-bold">
          {name}
        </p>
        <p className="text-[#FFC300] font-semibold text-sm leading-5 sm:text-base sm:leading-6 md:text-base md:leading-6">
          {title}
        </p>
        <p className="text-gray-700 text-sm leading-5 sm:text-base sm:leading-6 md:text-base md:leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
