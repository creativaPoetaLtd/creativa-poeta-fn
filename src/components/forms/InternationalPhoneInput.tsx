import { useEffect, useMemo, useRef, useState } from "react";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import type { LocaleCode } from "../../data/markets";

type InternationalPhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  locale: LocaleCode;
  defaultCountry?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
};

const copy: Record<LocaleCode, { country: string; phone: string }> = {
  en: { country: "Country and calling code", phone: "National number" },
  fr: { country: "Pays et indicatif", phone: "Numéro national" },
  nl: { country: "Land en landcode", phone: "Nationaal nummer" },
  kiny: { country: "Igihugu n'indangamuntu", phone: "Nimero ya telefone" },
};

const localeNames: Record<LocaleCode, string> = {
  en: "en",
  fr: "fr",
  nl: "nl",
  kiny: "rw",
};

const localeFallbackCountries: Record<LocaleCode, CountryCode> = {
  en: "BE",
  fr: "BE",
  nl: "NL",
  kiny: "RW",
};

const isCountryCode = (value?: string): value is CountryCode =>
  Boolean(value && getCountries().includes(value.toUpperCase() as CountryCode));

const getDefaultPhoneCountry = (locale: LocaleCode, marketCountry?: string): CountryCode =>
  isCountryCode(marketCountry) ? (marketCountry.toUpperCase() as CountryCode) : localeFallbackCountries[locale];

const flagFor = (country: CountryCode) =>
  country
    .split("")
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join("");

const nationalDisplayValue = (value: string, country: CountryCode) => {
  if (!value) return "";
  const parsed = parsePhoneNumberFromString(value);
  if (parsed) return parsed.country === country ? parsed.formatNational() : parsed.formatInternational();
  return value;
};

const normalizePhone = (input: string, country: CountryCode) => {
  const trimmed = input.trim();
  if (!trimmed) return "";

  const parsed = trimmed.startsWith("+")
    ? parsePhoneNumberFromString(trimmed)
    : parsePhoneNumberFromString(trimmed, country);
  if (parsed) return parsed.number;

  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  if (trimmed.startsWith("+")) return `+${digits}`;
  return `+${getCountryCallingCode(country)}${digits.replace(/^0+/, "")}`;
};

const InternationalPhoneInput = ({
  value,
  onChange,
  locale,
  defaultCountry,
  required = false,
  disabled = false,
  name,
  id,
  placeholder,
  className = "",
}: InternationalPhoneInputProps) => {
  const initialCountry = getDefaultPhoneCountry(locale, defaultCountry);
  const parsedInitial = parsePhoneNumberFromString(value);
  const [country, setCountry] = useState<CountryCode>(parsedInitial?.country ?? initialCountry);
  const [displayValue, setDisplayValue] = useState(() => nationalDisplayValue(value, parsedInitial?.country ?? initialCountry));
  const lastEmittedValue = useRef(value);

  useEffect(() => {
    if (value === lastEmittedValue.current) return;
    const parsed = parsePhoneNumberFromString(value);
    const nextCountry = parsed?.country ?? getDefaultPhoneCountry(locale, defaultCountry);
    setCountry(nextCountry);
    setDisplayValue(nationalDisplayValue(value, nextCountry));
    lastEmittedValue.current = value;
  }, [defaultCountry, locale, value]);

  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([localeNames[locale], "en"], { type: "region" });
    return getCountries()
      .map((code) => ({
        code,
        callingCode: getCountryCallingCode(code),
        name: names.of(code) ?? code,
      }))
      .sort((left, right) => left.name.localeCompare(right.name, localeNames[locale]));
  }, [locale]);

  const emit = (nextDisplayValue: string, nextCountry: CountryCode) => {
    const normalized = normalizePhone(nextDisplayValue, nextCountry);
    lastEmittedValue.current = normalized;
    onChange(normalized);
  };

  const handleCountryChange = (nextCountry: CountryCode) => {
    setCountry(nextCountry);
    const parsed = parsePhoneNumberFromString(displayValue);
    const nextDisplay = parsed?.country ? parsed.nationalNumber : displayValue;
    setDisplayValue(nextDisplay);
    emit(nextDisplay, nextCountry);
  };

  const handlePhoneChange = (rawValue: string) => {
    if (!rawValue.trim()) {
      setDisplayValue("");
      lastEmittedValue.current = "";
      onChange("");
      return;
    }

    const formatter = rawValue.trim().startsWith("+") ? new AsYouType() : new AsYouType(country);
    const formatted = formatter.input(rawValue);
    const detectedCountry = formatter.getCountry();
    if (detectedCountry) setCountry(detectedCountry);
    setDisplayValue(formatted || rawValue);
    emit(rawValue, detectedCountry ?? country);
  };

  return (
    <div className={`flex min-w-0 gap-2 ${className}`.trim()}>
      <select
        value={country}
        onChange={(event) => handleCountryChange(event.target.value as CountryCode)}
        aria-label={copy[locale].country}
        title={copy[locale].country}
        disabled={disabled}
        className="h-12 w-[8.75rem] shrink-0 rounded-xl border border-white/20 bg-[#071a33]/90 px-2 text-xs font-black text-white outline-none transition focus:border-[#fff200] disabled:opacity-60 tablet:rounded-2xl"
      >
        {countries.map((item) => (
          <option key={item.code} value={item.code}>
            {flagFor(item.code)} +{item.callingCode} {item.name}
          </option>
        ))}
      </select>
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={displayValue}
        onChange={(event) => handlePhoneChange(event.target.value)}
        placeholder={placeholder || copy[locale].phone}
        required={required}
        disabled={disabled}
        className="h-12 min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/45 focus:border-[#fff200] disabled:opacity-60 tablet:rounded-2xl"
      />
    </div>
  );
};

export default InternationalPhoneInput;
