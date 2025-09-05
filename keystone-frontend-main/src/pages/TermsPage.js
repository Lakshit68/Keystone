import React from "react";
import { Link } from "react-router-dom";

export const TermsPage = () => {
  return (
    <div className="bg-white text-black">
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Terms & Conditions
          </p>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn about how we collect, use, and protect your information, and understand our privacy practices.
          </p>
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

              {/* Introduction */}
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                Keystone International Ventures ("Keystone," "we," "us," or "our") values your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, share, and protect your personal data when you use our website https://www.keystoneinternationalventures.com/ ("Site"), particularly when you submit information via contact forms or download requests.
              </p>

              <p className="text-base leading-relaxed text-gray-800 mb-8">
                This Policy complies with international standards, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and the UK Data Protection Act (DPA 2018).
              </p>

              {/* Section 1: Information We Collect */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Information You Provide Directly</h3>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                When you fill out a form on our Site (such as a contact form or request to download a document), we may collect:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Company name</li>
                <li>Phone number</li>
                <li>Country/region</li>
                <li>Job title</li>
                <li>Details of your inquiry or interest</li>
                <li>Consent preferences (e.g., for marketing emails)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Information Collected Automatically</h3>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                When you visit our Site, we may automatically collect:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>IP address</li>
                <li>Browser and device type</li>
                <li>Operating system</li>
                <li>Referral source</li>
                <li>Date and time of access</li>
                <li>Pages visited</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                This data is collected using cookies, analytics scripts, and similar technologies. You can control these via your browser or our cookie banner (see Section 9).
              </p>

              {/* Section 2: How We Use Your Information */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. How We Use Your Information</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                We use your data to:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>Respond to inquiries and follow up on requests</li>
                <li>Deliver requested downloads (e.g., brochures, company decks)</li>
                <li>Send communications related to your interest, if consent is given</li>
                <li>Personalize your experience on our Site</li>
                <li>Improve our website, services, and offerings</li>
                <li>Comply with applicable laws and protect our legal rights</li>
              </ul>

              {/* Section 3: Legal Basis for Processing */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. Legal Basis for Processing (GDPR/UK DPA)</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                If you are in the EU, EEA, or UK, our legal bases for collecting and using your personal information are:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li><strong>Consent</strong> – when you provide it for specific purposes (e.g., marketing emails)</li>
                <li><strong>Contractual necessity</strong> – for fulfilling your requests</li>
                <li><strong>Legal obligation</strong> – to comply with laws or respond to legal process</li>
                <li><strong>Legitimate interests</strong> – to operate and improve our business, provided your rights don't override our interests</li>
              </ul>

              {/* Section 4: Your Rights */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Your Rights (GDPR, CCPA, UK DPA)</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                You may have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>Access the personal data we hold about you</li>
                <li>Correct or update inaccurate data</li>
                <li>Delete your personal data (right to be forgotten)</li>
                <li>Object to processing or request restriction</li>
                <li>Withdraw your consent at any time</li>
                <li>Receive a copy of your data in a portable format</li>
                <li>File a complaint with a data protection authority</li>
              </ul>

              <p className="text-base leading-relaxed text-gray-800 mb-4">
                To exercise your rights, contact us at: <a href="mailto:info@keystoneinternationalventures.com" className="text-blue-600 hover:text-blue-800 underline">info@keystoneinternationalventures.com</a>
              </p>

              <p className="text-base leading-relaxed text-gray-800 mb-4">
                If you are a California resident, you have additional rights under the CCPA, including the right to:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>Know what personal information is collected</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of the sale of personal information (Note: we do not sell your data)</li>
              </ul>

              {/* Section 5: How We Share Your Data */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. How We Share Your Data</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                We do not sell or rent your personal information. We may share it with:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>Service providers (e.g., email platforms, analytics providers, web hosts)</li>
                <li>Regulatory authorities or legal institutions, if required</li>
                <li>Affiliated companies or successors, in case of a merger or acquisition</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                All third parties are required to safeguard your data in accordance with this Privacy Policy.
              </p>

              {/* Section 6: Data Retention */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. Data Retention</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                We retain your personal data only as long as necessary to fulfill the purposes for which it was collected or to comply with legal obligations. You may request deletion of your data at any time.
              </p>

              {/* Section 7: Data Security */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7. Data Security</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                We use appropriate technical and organizational security measures to protect your data, including:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>SSL encryption</li>
                <li>Firewall protection</li>
                <li>Limited data access on a need-to-know basis</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                However, no method of transmission over the Internet is 100% secure. We encourage you to take your own precautions when transmitting data online.
              </p>

              {/* Section 8: International Transfers */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8. International Transfers</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                If you are located outside the United States, your information may be transferred to and processed in the United States or other jurisdictions that may not have equivalent data protection laws. By using our Site and submitting your data, you consent to such transfers.
              </p>

              {/* Section 9: Cookies and Tracking Technologies */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9. Cookies and Tracking Technologies</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2 ml-4">
                <li>Analyze site traffic and usage</li>
                <li>Improve site performance</li>
                <li>Personalize your experience</li>
                <li>Manage form submissions and downloads</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Cookie Preferences:</h3>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                You can manage your preferences through the cookie banner on our Site. You may also disable cookies via your browser settings, though this may affect certain functionalities.
              </p>

              {/* Section 10: Embedded Form Disclaimer */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">10. Embedded Form Disclaimer</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                Each form on our website will include a disclaimer similar to the following:
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
                <p className="text-yellow-800 italic">
                  "By submitting this form, you consent to the processing of your personal data by Keystone International Ventures in accordance with our Privacy Policy. We will only use your information for the purpose of responding to your inquiry or delivering requested content. You may unsubscribe from communications at any time."
                </p>
              </div>

              {/* Section 11: Third-Party Links */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">11. Third-Party Links</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                Our Site may include links to third-party websites, which are governed by their own privacy policies. We are not responsible for the content or privacy practices of such external sites.
              </p>

              {/* Section 12: Children's Privacy */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">12. Children's Privacy</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                We do not knowingly collect data from individuals under 13 (or under 16 in the EU/UK). If you believe we have received such information, please contact us immediately.
              </p>

              {/* Section 13: Updates to This Policy */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">13. Updates to This Policy</h2>
              <p className="text-base leading-relaxed text-gray-800 mb-6">
                We may revise this Privacy Policy from time to time. When we do, we will update the "Effective Date" and post the updated version on our Site. Your continued use of our services after such updates constitutes your agreement to the revised policy.
              </p>

              {/* Section 14: Contact Us */}
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">14. Contact Us</h2>
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
                  <a href="https://www.keystoneinternationalventures.com/" className="text-blue-600 hover:text-blue-800 underline">
                    https://www.keystoneinternationalventures.com/
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

export default TermsPage;
