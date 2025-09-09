import {
  HeroSection,
  InfoCard,
  TwoSidedSection,
} from "../components/molecules";
import groupwithhat from "../components/assets/groupwithhat.png";
import Mission from "../components/global/Mission";
import { charitiesData } from "../sampleData.js/charities";
import pramodsfather from"../components/assets/pramodsfather.jpg";
import pramodsmother from"../components/assets/pramodsmother.jpg";
import videoeight from "../components/videos/videoeight.mp4";

export const ChartiesPage = () => {
  return (
    <div className="flex flex-col w-full gap-6 md:gap-12 mb-8 md:mb-16 mt-16">
      <HeroSection
        title="Keystone Charities"
        // backgroundVideo="httpss://res.cloudinary.com/dopvfhjhs/video/upload/v1748884421/charity_pjrvwb.mp4"
        backgroundVideo={videoeight}
      />
      {/* <TwoSidedSection
        image={{
          src: "httpss://res.cloudinary.com/dopvfhjhs/image/upload/v1748884252/oldCouple_zpas21.png",
          alt: "Testimonial Image",
          width: 400,
          height: 300,
        }}
        description={[
          "At Keystone, we believe that true success is not only measured by what we achieve, but by what we give back.",
          "Guided by this principle, our Keystone Charitable Division proudly supports and celebrates a wide range of community outreach initiatives. It is through service to others that we discover our greatest purpose.",
        ]}
        imagePosition="left"
      /> */}
      <div className="flex flex-col lg:flex-row items-center gap-2 w-11/12 mx-auto am:p-6">
        <div className="flex flex-row gap-6 justify-center items-center w-full lg:w-6/12">
          <div className="w-1/2 flex justify-center">
            <img
              // src="httpss://res.cloudinary.com/dopvfhjhs/image/upload/v1749048165/4220b967-d1bb-407d-8c68-f95ddf243867.png"
              src={pramodsfather}
              alt="Promod's Father"
              className=" w-60 h-60 md:h-80 object-cover object-top rounded-xl shadow-md"
            />
          </div>
          <div className="w-1/2 flex justify-center">
            <img
              // src="httpss://res.cloudinary.com/dopvfhjhs/image/upload/v1749047994/18f8e5c6-08f0-48be-a848-dca34cd91374.png"
              src={pramodsmother}
              alt="Promod's Mother"
              className=" w-60 h-60 md:h-80 object-cover rounded-xl  shadow-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-6/12">
          <p className="text-[#313131] text-base sm:text-xl leading-relaxed whitespace-pre-line">
            At Keystone, we believe that true success is not only measured by
            what we achieve, but by what we give back.
          </p>
          <p className="text-[#313131] text-base sm:text-xl leading-relaxed whitespace-pre-line">
            Guided by this principle, our Keystone Charitable Division proudly
            supports and celebrates a wide range of community outreach
            initiatives. It is through service to others that we discover our
            greatest purpose.
          </p>
        </div>
      </div>
      {charitiesData.map((item, index) => (
        <InfoCard key={index} description={item.paragraphs} />
      ))}
      <img
        // src="httpss://res.cloudinary.com/dopvfhjhs/image/upload/v1748884244/charity_hyy3lq.jpg"
        src={groupwithhat}
        className="sm:h-[400px] md:w-8/12 w-10/12 rounded-lg mx-auto"
      />
      {/* <Mission /> */}
    </div>
  );
};
