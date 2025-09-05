import {
  HeroSection,
  InfoCard,
  TwoSidedSection,
} from "../components/molecules";
import internationalventuresservices from "../components/assets/internationalventuresservices.png";
import Mission from "../components/global/Mission";
import pramodfounder from "../components/assets/pramodfounder.png";
import { internationalVenturesData } from "../sampleData.js/internationalVentures";
import videotwo from "../components/videos/videotwo.mp4";
// content in right side
export const InternationalVenturesPage = () => {
  return (
    <div className="flex flex-col w-full gap-6 md:gap-12 mb-8 md:mb-16 mt-16">
      <HeroSection
        title="About Keystone"
        subtitle=" Keystone International Ventures"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884396/international_rqp8at.mp4"
          videotwo
        }
      />
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-col md:gap-12 mb-8 ">
        {internationalVenturesData.map((item, index) => (
          <InfoCard
            key={`first-${index}`}
            index={index}
            imageSrc={
              // "https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884256/InternationalVenture_dven9v.png"
              internationalventuresservices
            }
            description={item.paragraphs}
          />
        ))}

        <TwoSidedSection
          image={{
            // src: "https://res.cloudinary.com/dopvfhjhs/image/upload/v1751134909/c2104ab6-d731-4c53-8d3e-f2805f5f67b5.png",
            src: pramodfounder,
            alt: "Founder Image",
            width: 100,
            height: 200,
          }}
          description={[
            "Founded by Promod Sharma—a serial entrepreneur, Chartered Accountant, and London School of Economics MBA—Keystone reflects decades of experience building fast-growth, high-margin ventures. His leadership has fostered an executive team with over a decade of shared success.",
            "True success, we believe, is measured by what we achieve and what we give back. Our Charitable Division supports community outreach and philanthropy wherever we operate.",
            "Keystone International Ventures is driven by one mission: to invest in ideas that transform industries, uplift communities, and build a more sustainable future. From redefining data usage to enabling secure global communications and cross-border growth, we turn vision into value and innovation into impact.",
          ]}
          imagePosition="left"
        />

        {/* {internationalVenturesData.map((item, index) => (
          <InfoCard
            key={`second-${index}`}
            index={index}
            description={item.paragraphsTwo}
          />
        ))} */}

        {/* <Mission /> */}
      </div>
    </div>
  );
};
