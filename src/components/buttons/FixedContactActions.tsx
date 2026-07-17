import { useEffect, useState } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import "./SectionScrollButton.css";

const phoneHref = "tel:+32473297112";
const whatsappHref = "https://wa.me/32473297112";

const FixedContactActions = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const [hasScrollButton, setHasScrollButton] = useState(false);

  useEffect(() => {
    const detectScrollButton = () => {
      setHasScrollButton(Boolean(document.querySelector(".cp-scroll-actions")));
    };

    detectScrollButton();
    const timer = window.setTimeout(detectScrollButton, 250);
    window.addEventListener("resize", detectScrollButton);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", detectScrollButton);
    };
  }, []);

  useEffect(() => {
    const footer = document.getElementById("footer") || document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.02 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`cp-fixed-contact-actions${hasScrollButton ? " cp-fixed-contact-actions-with-scroll" : ""}${footerVisible ? " cp-fixed-actions-hidden" : ""}`}
      aria-label="Contacts rapides Creativa Poeta"
      aria-hidden={footerVisible}
    >
      <a className="cp-scroll-contact" href={phoneHref} aria-label="Appeler Creativa Poeta">
        <FaPhoneAlt />
        <span>Tel</span>
      </a>
      <a
        className="cp-scroll-contact cp-scroll-contact-whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter Creativa Poeta sur WhatsApp"
      >
        <FaWhatsapp />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};

export default FixedContactActions;
