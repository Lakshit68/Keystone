import { HeroSection, InfoCard } from "../components/molecules";

import Mission from "../components/global/Mission";
import { technologyServicesData } from "../sampleData.js/technologyServices";
import videoone from "../components/videos/videoone.mp4";

export const TechnologyServicesPage = () => {
  return (
    <div className="flex flex-col w-full gap-2 mb-8 mt-16">
      <HeroSection
        title="Keystone Technology Services"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884277/services_sfp7p0.mp4"
          videoone
        }
      />
      {/* <div className="w-11/12 md:w-10/12 mx-auto"> */}
      {technologyServicesData.map((item, index) => (
        <InfoCard
          key={index}
          index={index}
          imageSrc={item.image}
          title={item.title}
          description={item.paragraphs}
          anothertitle={item.anothertitle}
        />
      ))}
      {/* </div> */}

      {/* <Mission /> */}
    </div>
  );
};
