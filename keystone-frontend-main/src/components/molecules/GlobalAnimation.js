import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const GlobalScrollAnimation = () => {
  const location = useLocation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const elements = gsap.utils.toArray("p, h1, h2, h3, h4,h5,h6,span  img");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0, position: "relative" },
        {
          y: 0,
          opacity: 1,
          delay: 0.4,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        }
      );
    });
  }, [location.pathname]);

  return null;
};

export default GlobalScrollAnimation;
