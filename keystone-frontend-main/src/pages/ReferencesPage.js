import React from "react";

export const ReferencesPage = () => {
  return (
    <div className="bg-white text-black">
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            References
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Our Work and Partnerships
          </p>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the projects, partnerships, and achievements that showcase our commitment to excellence and innovation.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're currently building our references section to showcase our portfolio of successful projects and partnerships. 
              Check back soon for updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferencesPage;
