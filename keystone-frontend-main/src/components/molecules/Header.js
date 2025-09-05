const Header = ({ heading = "", paragraph = "", className = "" }) => {
  return (
    <div className={`text-center w-11/12 md:w-10/12 mx-auto px-4 ${className}`}>
      {heading && (
        <p className="text-3xl leading-[38px] sm:text-4xl sm:leading-[44px] md:text-5xl md:leading-[58px] font-semibold">
          {heading}
        </p>
      )}
      {paragraph && (
        <p className="text-sm leading-5 sm:text-base sm:leading-6 md:text-lg md:leading-7">
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default Header;
