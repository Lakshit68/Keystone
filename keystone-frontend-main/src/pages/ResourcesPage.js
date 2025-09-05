import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiBase } from '../utils/apiBase';

const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = getApiBase();
  return `${base}${url}`;
};

const useResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${getApiBase()}/api/resources?populate=*`;
        const res = await fetch(url);
        const json = await res.json();
        if (ignore) return;
        
        const mapped = (json?.data || []).map((node) => {
          return {
            id: node.id,
            title: node.title || "",
            description: node.description || "",
            image: resolveImageUrl(node.image?.url),
            file: resolveImageUrl(node.file?.url),
            category: node.category || "",
            publishedAt: node.publishedAt
          };
        });
        setResources(mapped);
      } catch (e) {
        setError(e?.message || "Failed to load resources");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
    return () => {
      ignore = true;
    };
  }, []);

  return { resources, loading, error };
};

const ResourceCard = ({ resource, onDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl h-[250px]transition-shadow duration-300">
      {/* Fixed-height wrapper to keep all cards leveled */}
      <div className="flex flex-col md:flex-row md:h-56">
        {/* Image Section - fixed width and height on desktop */}
        <div className="w-full md:w-80 h-48 md:h-full flex-shrink-0">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Content Section - stretches and pins button to bottom */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="pr-2">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
              {resource.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 line-clamp-3 md:line-clamp-2">
              {resource.description}
            </p>
          </div>

          {/* Button pinned to bottom, aligned consistently */}
          <div className="mt-auto pt-4">
            <button
              onClick={() => onDownload(resource.id, resource.title, resource)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourcesPage = () => {
  const { resources, loading, error } = useResources();
  const navigate = useNavigate();

  const handleDownload = (resourceId, resourceTitle, resourceData) => {
    navigate(`/resources/download/${resourceId}`, { 
      state: { 
        resourceId, 
        resourceTitle,
        resourceData: {
            title: resourceData.title,
            description: resourceData.description,
            file: resourceData.file
          } 
        }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="text-white mt-4 text-xl">Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Resources</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Keystone</h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Explore Strategic Insights, Case Studies & Investor Resources
            </p>
            <p className="text-sm md:text-base text-gray-400 max-w-4xl mx-auto">
              Discover the latest thought leadership and financial tools designed to inform, guide, and empower capital decision-makers.
            </p>
          </div>
          <div className="border-t border-gray-700 mt-10"></div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-white text-black py-10 md:py-14">
        <div className="container mx-auto px-4">
          {resources.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Resources Available</h3>
              <p className="text-gray-500">Check back soon for new resources and downloads.</p>
            </div>
          ) : (
            <div className="space-y-8 md:space-y-10">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4" />
      </section>
    </div>
  );
};

export default ResourcesPage;