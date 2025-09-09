import { Link } from "react-router-dom";

import { Button } from "../atoms";
import { useNavigate } from "react-router-dom";
const ScrollToTopLink = ({ to, children, className }) => (
  <Link
    to={to}
    className={className}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    {children}
  </Link>
);
const footerLinks = [
  {
    title: "About Us",
    items: [
      { label: "Leadership", link: "/aboutus/leadership" },

      { label: "CEO's Vision", link: "/aboutus/vision" },

      {
        label: "Keystone International Ventures",
        link: "/aboutus/internationalVentures",
      },
      {
        label: "Keystone Charities",
        link: "/aboutus/charity",
      },
    ],
  },
  {
    title: "Keystone Industries",
    items: [
      {
        label: "Emerging  Technology",
        link: "/technology/emergingTechnology",
      },
      { label: "Technology Services", link: "/technology/services" },

      { label: "Proprietary Solutions", link: "/technology/proprities" },
      
      { label: "Healthcare", link: "/technology/healthcare" },
      
      { label: "Hospitality", link: "/technology/hospitality" },

      { label: "Media", link: "/technology/media" },

    ],
  },
  {
    title: "Technology",
    items: [
      { label: "Emerging Technology", link: "/technology/emergingTechnology" },
      
      { label: "Technology Services", link: "/technology/services" },
      
      { label: "Proprietary Solutions", link: "/technology/proprities" },
    ],
  },
  {
    title: "Help",
    items: [{ label: "Contact Us", link: "/contact" }],
  },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between gap-2 mb-4 md:mb-0">
            <div className="flex flex-row items-center gap-2">
              <img
                src={
                  "/logo.png"
                  // "https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884248/logo_emf5vr.png"
                }
                alt="KeyStone Logo"
                className="h-10 cursor-pointer"
                onClick={() => navigate("/")}
              />
              <h1 className="text-[#FFC300] font-bold text-2xl">Keystone</h1>
            </div>
            <p className="text-[#FFC300]">
              Global Vision. Powering Innovation. Delivering Impact.
            </p>
          </div>
          {/* <div className="flex items-center gap-4">
            <span className="text-sm">Ready to get started?</span>
            <Button
              onClick={() => {
                navigate("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Get started
            </Button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
          <div className="text-sm text-gray-300">
            Keystone International Ventures is a dynamic global firm at the
            forefront of strategic investment, innovation, and transformative
            business growth across key industries.
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-2 text-[#FFC300]">
                {section.title}
              </h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {section.items.map((item, index) => (
                  <li key={index}>
                    {item.label === "Careers" ? (
                      <span className="cursor-default text-gray-400">
                        {item.label}
                      </span>
                    ) : (
                      <ScrollToTopLink
                        to={item.link}
                        className="hover:underline hover:text-yellow-500 transition"
                      >
                        {item.label}
                      </ScrollToTopLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 mt-10 gap-4">
          <div className="space-x-4">
            <ScrollToTopLink to="/cookies" className="hover:underline">
              Cookies
            </ScrollToTopLink>
            <ScrollToTopLink to="/terms" className="hover:underline">
              Privacy Policy
            </ScrollToTopLink>
          </div>
          <a
            href="https://www.linkedin.com/company/keystone-international-ventures/"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
