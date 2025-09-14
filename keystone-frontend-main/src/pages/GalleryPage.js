import React, { useEffect, useState } from "react";
import { getApiBase } from "../utils/apiBase";

const formatDate = (isoDateString) => {
  if (!isoDateString) return "";
  try {
    const d = new Date(isoDateString);
    const day = `${d.getDate()}`.padStart(2, "0");
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return isoDateString;
  }
};
const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("https")) return url;
  const base = getApiBase();
  return `${base}${url}`;
};


export const GalleryPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://keystone-backend-1.onrender.com/api/galleries"
        );
        if (!response.ok) throw new Error("Failed to fetch galleries");
        const data = await response.json();

        const mapped = data.map((gallery) => ({
          id: gallery._id,
          title: gallery.title || "",
          description: gallery.description || "",
          date: gallery.publishedAt || gallery.createdAt,
          images: gallery.images.map(
            (_, index) =>
              `https://keystone-backend-1.onrender.com/api/images/gallery/${gallery._id}/${index}`
          ),
        }));

        setGalleries(mapped);
      } catch (e) {
        setError(e?.message || "Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="pt-28 pb-16 h-full md:pt-32 md:pb-20 container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Keystone</h1>
          <p className="text-xl md:text-2xl mt-2">Moments That Define Our Mission</p>
          <p className="text-sm md:text-base text-gray-400 mt-4 max-w-2xl mx-auto">
            A curated collection of moments, milestones, and movements that shape our
            global capital journey.
          </p>
        </div>
        <div className="border-b border-gray-700 mt-10" />
      </section>

      {/* Gallery Section */}
      <section className="bg-white text-black">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Our Gallery</h3>

        {loading && <p className="text-gray-600">Loading Gallery...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className=" overflow-hidden p-4 flex flex-col"
              >

                {/* Image Grid */}
                                {/* Responsive Image Grid */}
                                <div className="w-full mt-10 mb-10">
                  {gallery.images.length === 1 && (
                    <div className="w-full h-48 md:h-96">
                      <img
                        src={gallery.images[0]}
                        alt="Gallery"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {gallery.images.length === 2 && (
                    <div className="grid grid-cols-2 gap-2 h-48 md:h-96">
                      <div className="rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                        <img
                          src={gallery.images[0]}
                          alt="Gallery 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                        <img
                          src={gallery.images[1]}
                          alt="Gallery 2"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {gallery.images.length >= 3 && (
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-48 md:h-96">
                      <div className="row-span-2 rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                        <img
                          src={gallery.images[0]}
                          alt="Gallery main"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                        <img
                          src={gallery.images[1]}
                          alt="Gallery secondary"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                        <img
                          src={gallery.images[2]}
                          alt="Gallery third"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Title + Date */}
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  {gallery.title}
                </h2>
                <p className="text-gray-600 text-sm font-medium mb-6">
                  {formatDate(gallery.date)}
                </p>


                
              </div>
            ))}
          </div>
        )}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;