import { useState } from "react";
import type { ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

export type ServiceFAQItem = {
  question: string;
  answer: string;
};

type ServiceFAQAccordionProps = {
  items: ServiceFAQItem[];
  icon?: ReactNode;
};

const ServiceFAQAccordion = ({ items, icon }: ServiceFAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={faq.question}
            className="overflow-hidden rounded-[1.4rem] border border-white/20 bg-[#071a33]/80 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left text-white phone:px-6"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-3 text-lg font-black phone:text-xl">
                {icon ? <span className="mt-1 flex-none text-[#fff200]">{icon}</span> : null}
                {faq.question}
              </span>
              <FaChevronDown
                className={`mt-1 flex-none text-[#fff200] transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isOpen ? (
              <div className="border-t border-white/10 px-5 pb-5 pt-1 phone:px-6">
                <p className="text-sm font-black leading-7 text-white/85 phone:text-base">
                  {faq.answer}
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
};

export default ServiceFAQAccordion;
