import React from "react";
import { Link } from "react-router-dom";

export const CookiesPage = () => {
  return (
    <div className="bg-white text-black">
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Cookies
          </h1>
    
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {/* Effective Date */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
                <p className="text-blue-800 font-semibold">
                  <strong>Effective Date:</strong> June 4, 2025
                </p>
              </div>

              {/* Introduction
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                Keystone International Ventures ("Keystone," "we," "us," or "our") values your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, share, and protect your personal data when you use our website httpss://www.keystoneinternationalventures.com/ ("Site"), particularly when you submit information via contact forms or download requests.
              </p>

              <p className="text-base leading-relaxed text-gray-800 mb-8">
                This Policy complies with international standards, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and the UK Data Protection Act (DPA 2018).
              </p> */}

              

              {/* Section 9: Cookies and Tracking Technologies */}
              <h2 className="text-4xl font-bold text-gray-900 mt-12 mb-6 items-center align-middle ml-25">Cookies and Tracking Technologies</h2>
              <p className="text-2xl leading-relaxed text-gray-800 mb-4 ">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>Analyze site traffic and usage</li>
                <li>Improve site performance</li>
                <li>Personalize your experience</li>
                <li>Manage form submissions and downloads</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Cookie Preferences:</h3>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                You can manage your preferences through the cookie banner on our Site. You may also disable cookies via your browser settings, though this may affect certain functionalities.
              </p>

             
              {/* Section 13: Updates to This Policy */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6"> Updates to This Policy</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                We may revise this Privacy Policy from time to time. When we do, we will update the "Effective Date" and post the updated version on our Site. Your continued use of our services after such updates constitutes your agreement to the revised policy.
              </p>

              {/* Section 14: Contact Us */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6"> Contact Us</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-800 font-semibold mb-2">Keystone International Ventures</p>
                <p className="text-gray-800 mb-2">
                  <a href="mailto:info@keystoneinternationalventures.com" className="text-blue-600 hover:text-blue-800 underline">
                    info@keystoneinternationalventures.com
                  </a>
                </p>
                <p className="text-gray-800">
                  <a href="httpss://www.keystoneinternationalventures.com/" className="text-blue-600 hover:text-blue-800 underline">
                    httpss://www.keystoneinternationalventures.com/
                  </a>
                </p>
              </div>

              {/* Back Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link 
                  to="/" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPage;
