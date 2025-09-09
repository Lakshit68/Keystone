import { HeroSection, InfoCard } from "../components/molecules";

import Mission from "../components/global/Mission";
import videofive from "../components/videos/videofive.mp4";
import { proprietarySolutionsData } from "../sampleData.js/proprietarySolutions";

export const PropritiesPage = () => {
  return (
    <div className="flex flex-col w-full gap-2 md:gap-2 mb-8 md:mb-16 mt-16">
      <HeroSection
        title="About Keystone"
        subtitle="Proprietary Solutions"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884405/prop_tjf33f.mp4"
          videofive
        }
      />
      {/* <div className="w-11/12 md:w-10/12 mx-auto"> */}
      {proprietarySolutionsData.map((item, index) => (
        <InfoCard
          key={index}
          index={index}
          imageSrc={
            // "https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884313/propriety_tnxm7f.png"
            item.image
          }
          description={item.paragraphs}
          // title={item.title}
        />
      ))}
      {/* </div> */}

      {/* <Mission /> */}
    </div>
  );
};
