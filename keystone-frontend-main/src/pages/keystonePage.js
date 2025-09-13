import InfoImageSection from "../components/molecules/InfoImageSection";
import { keystoneCompanies } from "../sampleData.js/keystoneCompanies";
import { Header } from "../components/molecules";
export const KeystonePage = () => {
  return (
    <div className="flex flex-col w-full gap-12 mb-8 md:mb-16 mt-16 py-24">
      <Header
        heading=" KEYSTONE INDUSTRIES"
        paragraph="Keystone International Ventures is a dynamic global firm at the forefront of strategic investment, innovation, and transformative business growth across key industries. "
      />
      <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ml-11 w-11/12 md:w-9/12">
        {keystoneCompanies.map((team, index) => (
          <InfoImageSection
            key={index}
            imageSrc={team.image}
            altText={team.title}
            title={team.title}
            content={team.description}
            link={team.link}
          />
        ))}
        </div>
      </div>
    </div>
  );
};
