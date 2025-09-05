import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "About Us",
    submenu: [
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
    label: "Gallery",
    link: "/gallery",
  },
  {
    label: "Blog",
    link: "/blog",
  },
  {
    label: "Resources",
    link: "/resources",
  },
  {
    label: "References",
    link: "/references",
  },
  {
    label: "Keystone Industries",
    link: "/keystoneCompanies",
  },
  {
    label: "Technology",
    submenu: [
      { label: "Emerging Technology", link: "/technology/emergingTechnology" },

      { label: "Technology Services", link: "/technology/services" },

      { label: "Proprietary Solutions", link: "/technology/proprities" },
    ],
  },

  {
    label: "Locations",
    link: "/location",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timeoutId = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;

      timeoutId = setTimeout(() => {
        if (window.scrollY < 50) {
          setShowNavbar(true);
        }
      }, 200);

      setOpenSubMenuIndex(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleSubMenu = (index) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const isActive = (link) => location.pathname === link;
  const isSubmenuActive = (submenu) =>
    submenu.some((sub) => location.pathname === sub.link);

  return (
    <nav
      className={`bg-black text-white px-6 py-4 shadow-md fixed w-full top-0 left-0 z-[9999] transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
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

        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item, index) => (
            <div key={item.label} className="relative">
              {item.submenu ? (
                <button
                  className={`flex items-center gap-1 cursor-pointer hover:text-yellow-300 ${
                    isSubmenuActive(item.submenu) ? "text-[#FFC300]" : ""
                  }`}
                  onClick={() => toggleSubMenu(index)}
                  aria-expanded={openSubMenuIndex === index}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      openSubMenuIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => navigate(item.link)}
                  className={`hover:text-yellow-300 ${
                    isActive(item.link) ? "text-[#FFC300]" : ""
                  }`}
                >
                  {item.label}
                </button>
              )}

              {item.submenu && openSubMenuIndex === index && (
                <div className="absolute left-0 top-full mt-2 w-60 bg-black border border-yellow-400 rounded shadow-lg z-50 transition-all duration-300">
                  {item.submenu.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() => {
                        navigate(sub.link);
                        setOpenSubMenuIndex(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-200 ${
                        isActive(sub.link)
                          ? "text-[#FFC300] bg-yellow-900"
                          : "text-white hover:bg-yellow-700"
                      }`}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => navigate("/contact")}
            className="bg-[#FFC300] hover:bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Contact Us
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 h-[200vh] z-[9999] left-0 w-full bg-black shadow-lg transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <img
                src={
                  "/logo.png"
                  // "https://res.cloudinary.com/dopvfhjhs/image/upload/v1748884248/logo_emf5vr.png"
                }
                alt="KeyStone Logo"
                className="h-10 cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              />
              <h1 className="text-[#FFC300] font-bold text-2xl">Keystone</h1>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {navItems.map((item, index) => (
            <div key={item.label}>
              <button
                className={`font-semibold cursor-pointer flex justify-between items-center w-full ${
                  item.submenu
                    ? isSubmenuActive(item.submenu)
                      ? "text-[#FFC300]"
                      : "text-white"
                    : isActive(item.link)
                    ? "text-[#FFC300]"
                    : "text-white"
                }`}
                onClick={() => {
                  if (item.submenu) {
                    toggleSubMenu(index);
                  } else {
                    navigate(item.link);
                    setMobileMenuOpen(false);
                  }
                }}
                aria-expanded={openSubMenuIndex === index}
              >
                <span>{item.label}</span>
                {item.submenu && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      openSubMenuIndex === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.submenu && openSubMenuIndex === index && (
                <ul className="pl-2 text-sm space-y-1 mt-1">
                  {item.submenu.map((sub, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        navigate(sub.link);
                        setMobileMenuOpen(false);
                        setOpenSubMenuIndex(null);
                      }}
                      className={`py-1 cursor-pointer ${
                        isActive(sub.link)
                          ? "text-[#FFC300]"
                          : "text-white hover:text-yellow-300"
                      }`}
                    >
                      {sub.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <button
            className="mt-4 bg-[#FFC300] hover:bg-yellow-500 text-black px-4 py-2 rounded"
            onClick={() => {
              navigate("/contact");
              setMobileMenuOpen(false);
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
