import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Mission from "../components/global/Mission";
import contactbackground from '../components/assets/contactbackground.png'
// new email changed to mailto
const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    businessName: "",
    websiteUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [countryData, setCountryData] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    let error = "";

    if (value.trim() === "") {
      error = `${field.replace(/([A-Z])/g, " $1")} is required`;
      error = error.charAt(0).toUpperCase() + error.slice(1);
    } else {
      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Invalid Email format";
        }
      }

      if (field === "phone") {
        const phoneDigits = value.replace(/\D/g, "");
        const dialCodeLength = countryData?.dialCode?.length || 0;
        const nationalNumber = phoneDigits.slice(dialCodeLength);

        if (nationalNumber.length < 6) {
          error = "Phone number must be at least 6 digits after country code";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.entries(formData).forEach(([field, value]) => {
      if (!value.trim()) {
        const message = `${field.replace(/([A-Z])/g, " $1")} is required`;
        newErrors[field] = message.charAt(0).toUpperCase() + message.slice(1);
      }
    });

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid Email format";
      }
    }

    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const dialCodeLength = countryData?.dialCode?.length || 0;
      const nationalNumber = phoneDigits.slice(dialCodeLength);
      if (nationalNumber.length < 10) {
        newErrors.phone =
          "Phone number must be at least 10 digits after country code";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitMessage("Form Submitted Successfully ✅");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        businessName: "",
        websiteUrl: "",
      });
    } else {
      setSubmitMessage("Please fill in all required fields.");
    }
  };

  return (
    <div className="mt-16 items-center w-full justify-center py-16 flex flex-col gap-6 md:gap-12 mb-8 md:mb-16 mx-auto">
      
      <div className="bg-white w-11/12 md:w-10/12 shadow-lg rounded-lg flex flex-col md:flex-row">
        <div
          style={{
            // backgroundImage: `url(${"https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884268/contact_riaftx.png"})`,
            backgroundImage: `url(${contactbackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="p-6 h-auto relative rounded-l-lg w-full md:w-1/3"
        >
          <div className="absolute inset-0 bg-black/60 z-0 rounded-lg"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl md:text-[28px] leading-9 text-[#FFC300] font-bold">
              Contact Information
            </h2>

            <div className="flex items-start gap-2">
              {/* <span className="text-black">📧</span> */}
              <a
                href="mailto:info@keystoneinternationalventures.com"
                className="text-[12px] leading-[18px] break-all text-white"
              >
                info@keystoneinternationalventures.com
                {/* href="mailto:marcie.cheney@keystoneinternationalventures.com" */}
                {/* marcie.cheney@keystoneinternationalventures.com */}
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-6 md:p-10">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-sm block">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full border-b border-gray-400 focus:outline-none p-2 bg-transparent"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-sm block">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full border-b border-gray-400 focus:outline-none p-2 bg-transparent"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-sm block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border-b border-gray-400 focus:outline-none p-2 bg-transparent"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-sm block">Phone Number</label>
                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  onChange={(value, country) => {
                    handleChange("phone", value);
                    setCountryData(country);
                  }}
                  inputClass="!w-full !py-4 !pr-4 !pl-12 !border-b !border-t-0 !border-l-0 !border-r-0 !border-gray-400 !rounded-0 !focus:ring-2 !focus:ring-green-900 !md:ml-[33px]"
                  buttonClass="!border-r !rounded-l-none"
                  containerClass="!w-full !rounded-none !border-b !border-t-0 !border-l-0 !border-r-0 !shadow-none !mt-2"
                  dropdownClass="!bg-white !border-b !border-t-0 !border-l-0 !border-r-0"
                  placeholder="Enter phone number"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-sm block">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className="w-full border-b border-gray-400 focus:outline-none p-2 bg-transparent"
                  placeholder="Business Name"
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm">{errors.businessName}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-sm block">Website URL</label>
                <input
                  type="text"
                  value={formData.websiteUrl}
                  onChange={(e) => handleChange("websiteUrl", e.target.value)}
                  className="w-full border-b border-gray-400 focus:outline-none p-2 bg-transparent"
                  placeholder="Website URL"
                />
                {errors.websiteUrl && (
                  <p className="text-red-500 text-sm">{errors.websiteUrl}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm block">Message</label>
              <textarea
                rows="3"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full border-b border-gray-400 focus:outline-none p-2 bg-transparent"
                placeholder="Write your message.."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>
            {submitMessage && (
              <p className={submitMessage.startsWith("Form") ? "text-green-600 text-xl" : "text-red-600 text-md"}>
                {submitMessage}
              </p>
            )}


            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#FFC300] text-black font-bold px-6 py-2 rounded-md hover:bg-yellow-500"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm italic text-yellow-900">
              By submitting the form your personal data will be shared to the Keystone Ventures. For more information, You may refer our{" "}
              <a href="/resources" className="underline text-yellow-700 hover:text-yellow-900">
                resources
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* <Mission /> */}
    </div>
  );
};

export default ContactPage;
