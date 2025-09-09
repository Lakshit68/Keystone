import React, { useEffect, useMemo, useState } from "react";
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

const useGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://keystone-backend-1.onrender.com/api/galleries');
        if (!response.ok) throw new Error('Failed to fetch galleries');
        const data = await response.json();
        
        if (!ignore) {
          const mapped = data.map((gallery) => ({
            id: gallery._id,
            title: gallery.title || "",
            date: gallery.publishedAt || gallery.createdAt,
            images: gallery.images.map((_, index) => 
              `https://keystone-backend-1.onrender.com/api/images/gallery/${gallery._id}/${index}`
            ),
          }));
          setItems(mapped);
        }
      } catch (e) {
        setError(e?.message || "Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  const grouped = useMemo(() => {
    // Sort items by ID (ascending)
    const sorted = [...items].sort((a, b) => a.id - b.id);
  
    const top = sorted.slice(0, 2);
    const rest = sorted.slice(2);
  
    return { top, rest };
  }, [items]);

  return { ...grouped, loading, error };
};

const ThumbnailRow = ({ images }) => {
  const thumbs = (images || []).slice(0, 3);
  if (thumbs.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {thumbs.map((src, idx) => (
        <div
          key={idx}
          className="w-full h-24 bg-gray-100 flex items-center justify-center rounded"
        >
          <img
            src={src}
            alt="thumb"
            className="max-h-full max-w-full object-contain rounded"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

const GalleryCard = ({ item, withThumbs }) => {
  const mainImage = item?.images?.[0];
  return (
    <div className="flex flex-col p-8">
      <div className="w-full bg-white-100 rounded-lg flex items-center justify-center">
        <img
          src={mainImage}
          alt={item?.title}
          // className="w-full h-auto object-contain rounded-lg"
           className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mx-auto"
          loading="lazy"
        />
      </div>
      {withThumbs && <ThumbnailRow images={item?.images?.slice(1)} />}
      <div className="mt-3 mr-4 text-left">
        <h4 className="text-black mt-1  text-sm md:text-base lg:text-lg font-medium">
          {item?.title}
        </h4>
        <p className="text-sm text-gray-500">{formatDate(item?.date)}</p>
      </div>
    </div>
  );
};

export const GalleryPage = () => {
  const { top, rest, loading, error } = useGallery();

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 container mx-auto px-4">
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

          {loading && <p className="text-gray-600">Loading gallery...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <>
              {/* Top cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {}
                {top.map((g) => (
                  <GalleryCard key={g.id} item={g} withThumbs />
                ))}
              </div>

              {/* Rest of gallery */}
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {rest.map((g) => (
                  <GalleryCard key={g.id} item={g} withThumbs={false} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
