import { HeroSection, InfoCard } from "../components/molecules";
import videoten from "../components/videos/videoten.mp4";
import Mission from "../components/global/Mission";
import { emergingTechnologyData } from "../sampleData.js/emergingTechnology";
// new changes for infocard
export const EmergingTechnologyPage = () => {
  return (
    // <div className="flex flex-col w-full gap-6 md:gap-12 mb-8 md:mb-16 mt-16">
    <div className="flex flex-col w-full gap-2 md:gap-2 mb-8 md:mb-16 mt-16">
      <HeroSection
        title="Keystone"
        subtitle="Emerging Technology"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884496/technology_qswnyo.mp4"
          videoten
        }
      />
      {/* <div className="w-11/12 md:w-10/12 mx-auto"> */}
      {emergingTechnologyData.map((item, index) => (
        <InfoCard
          key={index}
          index={index}
          imageSrc={item.image}
          description={item.paragraphs}
          linktext={item.linktext}
          title={item.title}
          anothertitle={item.anothertitle}
        />
      ))}
      {/* </div> */}

      {/* <Mission /> */}
    </div>
  );
};
