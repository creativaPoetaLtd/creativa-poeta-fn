import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import { getPublishedMarketLocales, LocaleCode, localeLabels } from "../../data/markets";

const languageFlags: Record<LocaleCode, string> = {
  en: "/uk.svg",
  fr: "/fr.png",
  nl: "/nll.jpg",
  kiny: "/rwanda.png",
};

type LanguageSwitcherProps = {
  variant?: "compact" | "text";
  className?: string;
  showCurrent?: boolean;
  onOpenChange?: (open: boolean) => void;
  textButtonClassName?: string;
};

const goToLocale = (locale: LocaleCode) => {
  const market = getCurrentMarket();

  if (typeof window !== "undefined") {
    window.localStorage.setItem("selectedLang", locale);
    window.location.href = buildLocalLocalePath(market, locale, window.location.pathname);
  }
};

const LanguageSwitcher = ({
  variant = "compact",
  className = "",
  showCurrent = false,
  onOpenChange,
  textButtonClassName,
}: LanguageSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const market = getCurrentMarket();
  const currentLocale = getCurrentLocale(market);
  const publishedMarketLocales = getPublishedMarketLocales(market);
  const availableLocales = showCurrent
    ? publishedMarketLocales
    : publishedMarketLocales.filter((locale) => locale !== currentLocale);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);

  if (publishedMarketLocales.length < 2 || availableLocales.length === 0) return null;

  if (variant === "text") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`} aria-label="Changer de langue">
        {availableLocales.map((locale) => {
          const active = locale === currentLocale;

          return (
            <button
              key={locale}
              type="button"
              onClick={() => goToLocale(locale)}
              className={`${textButtonClassName ?? "rounded-full border px-3 py-2 text-[11px] font-black uppercase"} transition ${
                active
                  ? "border-[#fff200] bg-[#fff200] text-[#071a33]"
                  : "border-white/20 bg-white/[.04] text-white hover:border-[#fff200] hover:text-[#fff200]"
              }`}
              aria-current={active ? "true" : undefined}
            >
              {localeLabels[locale]}
            </button>
          );
        })}
      </div>
    );
  }

  const otherLocales = publishedMarketLocales.filter((locale) => locale !== currentLocale);

  return (
    <div ref={rootRef} className={`relative z-[120] flex flex-col items-end ${className}`} aria-label="Changer de langue">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1 rounded-full bg-black/65 px-1.5 py-1 shadow-lg shadow-black/20 backdrop-blur-sm transition hover:bg-black/85"
        aria-expanded={open}
        aria-label={`Langue actuelle : ${localeLabels[currentLocale]}`}
      >
        <img
          src={languageFlags[currentLocale]}
          alt={localeLabels[currentLocale]}
          className="h-4 w-6 rounded-[2px] object-cover"
        />
        <span className={`text-sm text-white transition ${open ? "rotate-180" : ""}`}>
          <IoMdArrowDropdown />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 flex flex-col items-end gap-1 rounded-full bg-black/55 p-1 backdrop-blur-sm">
          {otherLocales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => goToLocale(locale)}
              className="flex items-center justify-center rounded-full border border-white/20 bg-black/65 px-1.5 py-1 shadow-lg shadow-black/20 transition hover:border-[#fff200] hover:bg-[#fff200]/20"
              aria-label={`Passer en ${localeLabels[locale]}`}
            >
              <img
                src={languageFlags[locale]}
                alt={localeLabels[locale]}
                className="h-4 w-6 rounded-[2px] object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

