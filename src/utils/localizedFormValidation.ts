import type { LocaleCode } from "../data/markets";

type ValidationCopy = {
  required: string;
  email: string;
  contact: string;
};

const copies: Record<LocaleCode, ValidationCopy> = {
  fr: {
    required: "Veuillez compléter les champs obligatoires indiqués par une étoile.",
    email: "Veuillez saisir une adresse e-mail valide.",
    contact: "Indiquez au moins une adresse e-mail ou un numéro de téléphone/WhatsApp.",
  },
  en: {
    required: "Please complete the required fields marked with an asterisk.",
    email: "Please enter a valid email address.",
    contact: "Provide at least an email address or a phone/WhatsApp number.",
  },
  nl: {
    required: "Vul de verplichte velden met een sterretje in.",
    email: "Vul een geldig e-mailadres in.",
    contact: "Vul minstens een e-mailadres of telefoon-/WhatsApp-nummer in.",
  },
  kiny: {
    required: "Uzuza ahantu hose h'ingenzi haranzwe n'inyenyeri.",
    email: "Andika aderesi ya e-mail yemewe.",
    contact: "Andika nibura e-mail cyangwa nimero ya telefone/WhatsApp.",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const focusInvalidControl = (control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
  control.setAttribute("aria-invalid", "true");
  control.focus({ preventScroll: true });
  control.scrollIntoView({ behavior: "smooth", block: "center" });
};

export const validateLocalizedForm = (form: HTMLFormElement, locale: LocaleCode): string | null => {
  const controls = Array.from(form.elements).filter(
    (element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
      element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement
  );

  controls.forEach((control) => control.removeAttribute("aria-invalid"));

  const missing = controls.find((control) => {
    if (!control.required || control.disabled) return false;
    if (control instanceof HTMLInputElement && ["checkbox", "radio"].includes(control.type)) return !control.checked;
    return !control.value.trim();
  });
  if (missing) {
    focusInvalidControl(missing);
    return copies[locale].required;
  }

  const invalidEmail = controls.find(
    (control) => control instanceof HTMLInputElement && control.type === "email" && control.value.trim() && !emailPattern.test(control.value.trim())
  );
  if (invalidEmail) {
    focusInvalidControl(invalidEmail);
    return copies[locale].email;
  }

  return null;
};

export const getContactRequiredMessage = (locale: LocaleCode) => copies[locale].contact;

export const normalizeWebsiteUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};
