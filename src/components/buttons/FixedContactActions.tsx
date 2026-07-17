import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import "./SectionScrollButton.css";

const phoneHref = "tel:+32473297112";
const whatsappHref = "https://wa.me/32473297112";

const FixedContactActions = () => {
  return (
    <div className="cp-fixed-contact-actions" aria-label="Contacts rapides Creativa Poeta">
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
