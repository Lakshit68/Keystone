import {
  HeroSection,
  InfoImageSection,
  Header,
  ProfileCard,
} from "../components/molecules";
import groupwithhat from '../components/assets/groupwithhat.png';
import videothree from "../components/videos/videothree.mp4"
import { Mission, MapWithMarkers } from "../components/global";
import { teamMembers } from "../sampleData.js/teamMember";
import { keystoneCompanies } from "../sampleData.js/keystoneCompanies";
import aboutImage from "../components/assets/internationalventuresservices.png";

import { useNavigate } from "react-router-dom";
export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full gap-12 mb-8 md:mb-16 mt-0 ">
      <HeroSection
        title="Keystone"
        subtitle="International Ventures"
        description=" " 

            className="bg-black text-white relative z-10 min-h-[60vh] flex items-center justify-center"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884477/glitterBackground_vv5th5.mp4"
          videothree
        }
      />

      {/* About Section */}
     
      <section className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="rounded-2xl overflow-hidden">
          <img 
            src={aboutImage} 
            alt="About Keystone" 
            className="w-full h-[320px] md:h-[360px] object-cover rounded-2xl"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            ABOUT KEYSTONE <br /> INTERNATIONAL VENTURES
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Keystone is a dynamic global firm at the forefront of strategic investment, 
            innovation, and transformative business growth across key industries. With a bold vision 
            to redefine industries and improve lives in domestic and international markets, Keystone 
            leverages a robust network of partners worldwide, cutting‑edge technologies, and deep 
            market expertise to deliver tailored solutions that help clients navigate complex challenges, 
            accelerate market entry, and achieve sustainable success.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our independent portfolio companies collaborate under a shared commitment to excellence 
            and customer success, offering integrated, end‑to‑end solutions that adapt swiftly to 
            evolving market dynamics. We leverage emerging technologies—rapid prototyping, continuous 
            development, scalable deployment—to create competitive advantages and measurable outcomes. 
            Long‑term, trust‑based relationships with clients, partners, and stakeholders underpin 
            our sustainable, responsible approach.
          </p>
        </div>
      </section>

      

      <Header
        heading="KEYSTONE INDUSTRIES"
        paragraph="Keystone International Ventures is a dynamic global firm at the forefront of strategic investment, innovation, and transformative business growth across key industries."
      />

      {/* Industries - circular tiles */}
      <section className="w-11/12 md:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {keystoneCompanies.map((item, idx) => (
          <button
            key={idx}
            onClick={() => item.link && navigate(item.link)}
            className="group focus:outline-none"
          >
            <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-md">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <span className="text-white font-semibold text-sm leading-snug">
                  {item.title}
                </span>
              </div>
            </div>
          </button>
        ))}
      </section>


      <Header
        heading=" KEYSTONE CHARITIES"
        paragraph="At Keystone, we believe that true success is not only measured by what we achieve, but by what we give back. "
      />
      <img
        // src="https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884244/charity_hyy3lq.jpg"
        src={groupwithhat}
        className="w-8/12 rounded-lg mx-auto"
      />
      <Header paragraph="Guided by this core principle, our Keystone Charitable Division actively supports, promotes, and celebrates a wide range of community outreach initiatives. It is through service to others that we find our greatest purpose." />
      <button
        onClick={() => {
          navigate("/aboutus/charity");
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 100);
        }}
        className="text-center align-center mx-auto flex justify-center bg-[#FFC300] hover:bg-yellow-500 text-black px-4 py-2 rounded w-fit"
      >
        Keystone Charities
      </button>
      <Header
        heading="LEADERSHIP TEAM"
        paragraph="We Focus on the details of everything we do. All to help businesses around the world Focus on what's most important to them."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 md:w-9/12 lg:w-7/12 mx-auto">
        {teamMembers.map((team, index) => (
          <ProfileCard
            key={index}
            imageSrc={team.image}
            altText={team.name}
            name={team.name}
            title={team.title}
            description={team.description}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => navigate("/aboutus/leadership")}
          className="mt-2 bg-black text-white hover:bg-gray-900 px-5 py-2 rounded"
        >
          See more
        </button>
      </div>

      {/* <Mission showOn="home" /> */}
    </div>
  );
};
