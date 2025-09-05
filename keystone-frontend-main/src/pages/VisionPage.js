import { HeroSection, InfoCard } from "../components/molecules";

import Mission from "../components/global/Mission";
import { visionData } from "../sampleData.js/vision";
import FounderSection from "../components/global/FounderSection";
import videoten from "../components/videos/videoten.mp4";

export const VisionPage = () => {
  return (
    <div className="flex flex-col w-full gap-6 mb-8 md:mb-16 mt-16">
      <HeroSection
        title="Keystone Vision"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884396/vision_dcnv4r.mp4"
          videoten
        }
      />
      <FounderSection />
      {visionData.map((item, index) => (
        <InfoCard key={index} description={item.paragraphs} />
      ))}
      <div className="flex flex-col gap-4 bg-white w-11/12 mx-auto">
        <p className=" text-[#313131] text-base sm:text-lg md:text-lg leading-relaxed whitespace-pre-line">
          <strong>
            {" "}
            Keystone International Ventures was born from this vision{" "}
          </strong>
          : A private equity platform that not only invests in the future of
          emerging technology, but also reflects my personal commitment to
          creativity, service, and meaningful impact. At Keystone, we are
          building more than businesses—we are building solutions, stories, and
          opportunities that make a difference in the world around us.
        </p>
      </div>
      {/* <Mission /> */}
    </div>
  );
};
