// import React, { useEffect, useState } from "react";
// import { getApiBase } from "../utils/apiBase";

// const resolveImageUrl = (url) => {
//   if (!url) return "";
//   if (url.startsWith("https")) return url;
//   const base = getApiBase();
//   return `${base}${url}`;
// };

// const useHospitalityPortfolio = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let ignore = false;
//     const fetchProperties = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const base = getApiBase();
//         // Try different endpoints for hospitality properties
//         const tryEndpoints = [
//           `${base}/api/hospitality-properties?populate=*`,
//           `${base}/api/hotels?populate=*`,
//           `${base}/api/resorts?populate=*`,
//           `${base}/api/properties?populate=*`,
//         ];

//         let data = null;
//         for (const url of tryEndpoints) {
//           const res = await fetch(url);
//           if (res.ok) {
//             const json = await res.json();
//             if (json?.data) {
//               data = json.data;
//               break;
//             }
//           }
//         }

//         if (!data) throw new Error("No hospitality properties endpoint found");

//         const mapped = data.map((node) => {
//           const a = node?.attributes || node || {};
//           const images = a?.Image || a?.image || [];
//           const firstImage = Array.isArray(images) && images.length > 0
//             ? resolveImageUrl(images[0]?.url || images[0]?.formats?.medium?.url || images[0]?.formats?.small?.url)
//             : null;
//           return {
//             id: node.id,
//             name: a?.Title || a?.name || a?.title || "Property Name",
//             location: a?.Location || a?.location || a?.city || "Location",
//             rating: a?.Rating || a?.rating || 5,
//             description: a?.Description || a?.description || a?.summary || "Property description",
//             image: firstImage,
//           };
//         });

//         if (!ignore) setProperties(mapped);
//       } catch (e) {
//         if (!ignore) setError(e?.message || "Failed to load properties");
//       } finally {
//         if (!ignore) setLoading(false);
//       }
//     };
//     fetchProperties();
//     return () => {
//       ignore = true;
//     };
//   }, []);

//   return { properties, loading, error };
// };

// const StarRating = ({ rating }) => {
//   return (
//     <div className="flex gap-1">
//       {[...Array(5)].map((_, i) => (
//         <svg
//           key={i}
//           className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ))}
//     </div>
//   );
// };

// const PropertyCard = ({ property }) => {
//   // List of random hotel websites to open
//   const hotelWebsites = [
//     "https://www.marriott.com",
//     "https://www.hilton.com",
//     "https://www.hyatt.com",
//     "https://www.ihg.com",
//     "https://www.accor.com",
//     "https://www.ritzcarlton.com",
//     "https://www.fourseasons.com",
//     "https://www.aman.com",
//     "https://www.rosewoodhotels.com",
//     "https://www.stregis.com"
//   ];

//   const handleCardClick = () => {
//     // Select a random hotel website
//     const randomWebsite = hotelWebsites[Math.floor(Math.random() * hotelWebsites.length)];
//     // Open in new tab
//     window.open(randomWebsite, '_blank');
//   };

//   return (
//     <div
//       className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
//       onClick={handleCardClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//           handleCardClick();
//         }
//       }}
//     >
//       <div className="relative">
//         {property.image ? (
//           <img
//             src={property.image}
//             alt={property.name}
//             className="w-full h-90 md:h-96 object-cover"
//             loading="lazy"
//           />
//         ) : (
//           <div className="w-full h-90 md:h-96 bg-gray-200 flex items-center justify-center">
//             <span className="text-gray-500">No Image</span>
//           </div>
//         )}
//       </div>
//       <div className="p-4">
//         <div className="mb-2">
//           <StarRating rating={property.rating} />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//           {property.name}
//         </h3>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           {property.description}
//         </p>
//         <p className="text-xs text-blue-600 mt-2 hover:text-blue-800">
//           Click to visit website →
//         </p>
//       </div>
//     </div>
//   );
// };

// export const HospitalityPage = () => {
//   const { properties, loading, error } = useHospitalityPortfolio();

//   return (
//     <div className="bg-white text-black">
//       {/* Hero Section */}
//       <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-black h-[75vh] text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             Keystone Hospitality:
//           </h1>
//           <p className="text-xl md:text-2xl mb-6">
//             Building Spaces That Welcome the World
//           </p>
//           <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             We specialize in capital-backed hospitality development — from boutique hotels to integrated resort infrastructure — in global markets with growing tourism economies.
//           </p>
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section className="py-16 md:py-20 bg-white">
//         <div className="container mx-auto px-4 ">
//           {/* <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"> */}
//           {/* Left Side - Image */}
//           <div className="flex gap-4 items-center mb-8 h-[320px] md:h-[380px]">
            

//               <img
//                 src="/hospitality-woman.jpg" // Replace with actual image path
//                 alt="Hospitality professional"
//                 className="w-full  md:aspect-square h-[320px] md:h-[380px] object-cover rounded-xl"
//               />

            

//             {/* Right Side - Text Content */}
//             <div className="ml-10  space-y-8 text-gray-800">
//               <p className="text-base md:text-lg leading-relaxed text-gray-700">
//                 At Keystone, we believe extraordinary experiences are the foundation of lasting value. Our Hospitality Division reflects this ethos—anchored in culinary excellence, community connection, and a relentless focus on guest delight. With a strategic presence in the high-growth hospitality sector, we're building a portfolio that delivers both memorable moments and measurable returns.
//               </p>

//               <p className="text-base md:text-lg leading-relaxed text-gray-700">
//                 We currently operate four acclaimed restaurants in Washington, D.C., with two new concepts launching in late 2025. Our diverse portfolio spans elevated fine dining to trend-forward social spaces—each designed to capture the vibrant energy of the city:
//               </p>
//             </div></div>
//           <div className="space-y-8 ">
//             <div className="">
//             <p className="text-base md:text-lg leading-relaxed text-gray-700">
//               <strong>Coming soon:</strong> Urban Roast West Palm Beach – a coastal evolution of our signature brand, where upscale ambiance meets craft cocktails, curated cuisine, and DJ-driven energy with a beachside twist.
//             </p>
            
//             <p className="text-base md:text-lg leading-relaxed text-gray-700">
//               In late 2025, we'll unveil Chamberlain, a Michelin-attuned chef-driven concept paired with an exclusive, membership-only Cigar & Cognac Lounge – a celebration of luxury, culture, and connection.
//             </p>
//             </div>

//           <p className="text-base md:text-lg leading-relaxed text-gray-700">
//             Our approach combines disciplined investment with creative vision, operational excellence, and a relentless focus on quality. We partner with top chefs and hospitality leaders to build standout destinations—and as we grow, we remain committed to customer experience, stakeholder value, and long-term success.
//           </p>
//         </div>
//         </div>

//       </section>

//       {/* Portfolio Section */}
//       <section className="py-16 md:py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
//             Our Portfolio - Hotels/Resorts Section
//           </h2>

//           {loading && (
//             <div className="text-center py-12">
//               <p className="text-gray-600">Loading properties...</p>
//             </div>
//           )}

//           {error && (
//             <div className="text-center py-12">
//               <p className="text-red-600">{error}</p>
//             </div>
//           )}

//           {!loading && !error && (
//             <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//               {properties.map((property) => (
//                 <PropertyCard key={property.id} property={property} />
//               ))}
//             </div>
//           )}

//           {/* Fallback content if no properties loaded */}
//           {!loading && !error && properties.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-600">No properties available at the moment.</p>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HospitalityPage;

import { HeroSection, InfoCard } from "../components/molecules";
import React, { useEffect, useState } from "react";
import Mission from "../components/global/Mission";

import { hospitalityData } from "../sampleData.js/hospitality";
import videoseven from "../components/videos/videoseven.mp4";
import { getApiBase } from "../utils/apiBase";

const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("https")) return url;
  const base = getApiBase();
  return `${base}${url}`;
};

const useHospitalityPortfolio = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = getApiBase();
        // Try different endpoints for hospitality properties
        const tryEndpoints = [
          `${base}/api/hospitality-properties?populate=*`,
          `${base}/api/hotels?populate=*`,
          `${base}/api/resorts?populate=*`,
          `${base}/api/properties?populate=*`,
        ];

        let data = null;
        for (const url of tryEndpoints) {
          const res = await fetch(url);
          if (res.ok) {
            const json = await res.json();
            if (json?.data) {
              data = json.data;
              break;
            }
          }
        }

        if (!data) throw new Error("No hospitality properties endpoint found");

        const mapped = data.map((node) => {
          const a = node?.attributes || node || {};
          const images = a?.Image || a?.image || [];
          const firstImage = Array.isArray(images) && images.length > 0
            ? resolveImageUrl(images[0]?.url || images[0]?.formats?.medium?.url || images[0]?.formats?.small?.url)
            : null;
          return {
            id: node.id,
            name: a?.Title || a?.name || a?.title || "Property Name",
            location: a?.Location || a?.location || a?.city || "Location",
            rating: a?.Rating || a?.rating || 5,
            description: a?.Description || a?.description || a?.summary || "Property description",
            image: firstImage,
          };
        });

        if (!ignore) setProperties(mapped);
      } catch (e) {
        if (!ignore) setError(e?.message || "Failed to load properties");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProperties();
    return () => {
      ignore = true;
    };
  }, []);

  return { properties, loading, error };
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const PropertyCard = ({ property }) => {
  // List of random hotel websites to open
  const hotelWebsites = [
    "https://www.marriott.com",
    "https://www.hilton.com",
    "https://www.hyatt.com",
    "https://www.ihg.com",
    "https://www.accor.com",
    "https://www.ritzcarlton.com",
    "https://www.fourseasons.com",
    "https://www.aman.com",
    "https://www.rosewoodhotels.com",
    "https://www.stregis.com"
  ];

  const handleCardClick = () => {
    // Select a random hotel website
    const randomWebsite = hotelWebsites[Math.floor(Math.random() * hotelWebsites.length)];
    // Open in new tab
    window.open(randomWebsite, '_blank');
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div className="relative">
        {property.image ? (
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-90 md:h-96 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-90 md:h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <StarRating rating={property.rating} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {property.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {property.description}
        </p>
        <p className="text-xs text-blue-600 mt-2 hover:text-blue-800">
          Click to visit website →
        </p>
      </div>
    </div>
  );
};

export const HospitalityPage = () => {
  const { properties, loading, error } = useHospitalityPortfolio();



  return (
    <div className="flex flex-col w-full gap-6 md:gap-12 mb-8 md:mb-16 mt-16">
      <HeroSection
        title=" Keystone"
        subtitle="Hospitality"
        backgroundVideo={
          // "https://res.cloudinary.com/dopvfhjhs/video/upload/v1748884393/hospitality_rrtahj.mp4"
          videoseven
        }
      />
      {hospitalityData.map((item, index) => (
        <InfoCard
          key={index}
          index={index}
          imageSrc={
            // "https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884283/hospitality_dxsdmj.png"
            item.image
          }
          description={item.paragraphs}
          title={item.title}
        />
      ))}

      {/* <Mission /> */}
      {/* Portfolio Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
             Our Portfolio - Hotels/Resorts Section
           </h2>

           {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading properties...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* Fallback content if no properties loaded */}
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No properties available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
