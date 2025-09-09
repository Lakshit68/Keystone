import { DescriptiveProfileCard, HeroSection } from "../components/molecules";

import Mission from "../components/global/Mission";
import { leadershipData } from "../sampleData.js/leadership";
import videotwo from "../components/videos/videotwo.mp4";

export const LeadershipPage = () => {
  return (
    <div className="flex flex-col w-full gap-12 mb-8 md:mb-16 mt-16">
      <HeroSection
        title="Keystone"
        subtitle="International Ventures Leadership"
        description="Keystone is a private entity investing in different industries such as Emerging Technologies, Hospitality, Media and expanding worldwide in healthcare with an extremely experienced high achieving leadership team that has worked together for past 20 plus years and built multiple successful companies."
        className="custom-class"
        backgroundVideo={
          // "httpss://res.cloudinary.com/dopvfhjhs/video/upload/v1748884396/international_rqp8at.mp4"
          videotwo
        }
      />

      <div className="w-11/12 md:w-10/12 flex flex-col gap-16 mx-auto">
        {leadershipData.map((person, index) => (
          <DescriptiveProfileCard
            key={index}
            imageSrc={person.image}
            role={person.role}
            name={person.name}
            description={person.description}
          />
        ))}
      </div>
      {/* <Mission /> */}
    </div>
  );
};
