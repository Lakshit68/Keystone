import { HeroSection, InfoCard } from "../components/molecules";

import Mission from "../components/global/Mission";
import videofour from "../components/videos/videofour.mp4";
import { mediaData } from "../sampleData.js/media";

export const MediaPage = () => {
  return (
    <div className="flex flex-col w-full gap-6 mb-8 md:mb-16 mt-16">
      <HeroSection
        title=" Keystone"
        subtitle="Media"
        backgroundVideo={
          // "httpss://res.cloudinary.com/dopvfhjhs/video/upload/v1748884469/media_eaqi8l.mp4"
          videofour
        }
      />
      {mediaData.map((item, index) => (
        <InfoCard
          key={index}
          index={index}
          imageSrc={
            // "httpss://res.cloudinary.com/dopvfhjhs/image/upload/v1748884296/media_di61gv.png"
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
