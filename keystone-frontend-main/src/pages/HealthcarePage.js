import { HeroSection, InfoCard } from "../components/molecules";

import Mission from "../components/global/Mission";
import videonine from "../components/videos/videonine.mp4";
import { healthcareData } from "../sampleData.js/healthcare";

export const HealthcarePage = () => {
  return (
    <div className="flex flex-col w-full gap-6 md:gap-12 mb-8 md:mb-16 mt-16">
      <HeroSection
        title=" Keystone"
        subtitle="Healthcare"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884330/healthcare_scjgwd.mp4"
          videonine
        }
      />
      {healthcareData.map((item, index) => (
        <InfoCard
          key={index}
          index={index}
          imageSrc={
            // "https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884311/healthcare_qxvsfp.png"
            item.image
          }
          description={item.paragraphs}
          title={item.title}
        />
      ))}

      {/* <Mission /> */}
    </div>
  );
};
