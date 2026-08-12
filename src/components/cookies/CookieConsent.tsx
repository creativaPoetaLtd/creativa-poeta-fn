import { useEffect, useMemo, useState } from "react";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";
import "./CookieConsent.css";

type CookieChoice = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

type OptionalCookieKey = "preferences" | "analytics" | "marketing";

const STORAGE_KEY = "cp_cookie_consent_v1";

const copy = {
  fr: {
    title: "Gestion des cookies",
    text: "Nous utilisons des cookies nécessaires au fonctionnement du site. Avec votre accord, nous pouvons aussi utiliser des cookies de préférences, d'analyse et de marketing.",
    necessary: "Nécessaires",
    preferences: "Preferences",
    analytics: "Analyse",
    marketing: "Marketing",
    necessaryText: "Toujours actifs pour faire fonctionner le site et memoriser votre choix.",
    preferencesText: "Langue et confort d’utilisation.",
    analyticsText: "Mesure d'audience pour améliorer le site.",
    marketingText: "Campagnes, remarketing ou contenus personnalisés.",
    decline: "Refuser",
    accept: "Accepter",
    customize: "Personnaliser",
    save: "Enregistrer mes choix",
    back: "Retour",
    more: "Confidentialité et cookies",
  },
  en: {
    title: "Cookie settings",
    text: "We use cookies required for the website to work. With your agreement, we may also use preference, analytics and marketing cookies.",
    necessary: "Necessary",
    preferences: "Preferences",
    analytics: "Analytics",
    marketing: "Marketing",
    necessaryText: "Always active to run the website and store your choice.",
    preferencesText: "Language and comfort settings.",
    analyticsText: "Audience measurement to improve the website.",
    marketingText: "Campaigns, remarketing or personalized content.",
    decline: "Decline",
    accept: "Accept",
    customize: "Customize",
    save: "Save choices",
    back: "Back",
    more: "Privacy and cookies",
  },
  nl: {
    title: "Cookie-instellingen",
    text: "Wij gebruiken noodzakelijke cookies om de website te laten werken. Met uw akkoord kunnen we ook voorkeuren-, analyse- en marketingcookies gebruiken.",
    necessary: "Noodzakelijk",
    preferences: "Voorkeuren",
    analytics: "Analyse",
    marketing: "Marketing",
    necessaryText: "Altijd actief voor de werking van de site en het bewaren van uw keuze.",
    preferencesText: "Taal en comfortinstellingen.",
    analyticsText: "Publieksmeting om de website te verbeteren.",
    marketingText: "Campagnes, remarketing of gepersonaliseerde inhoud.",
    decline: "Weigeren",
    accept: "Accepteren",
    customize: "Aanpassen",
    save: "Keuzes opslaan",
    back: "Terug",
    more: "Privacy en cookies",
  },
  kiny: {
    title: "Cookie settings",
    text: "Dukoresha cookies zikenewe kugira ngo site ikore. Iyo ubyemeye, dushobora no gukoresha preferences, analytics na marketing cookies.",
    necessary: "Necessary",
    preferences: "Preferences",
    analytics: "Analytics",
    marketing: "Marketing",
    necessaryText: "Zihora zikora kugira ngo site ikore kandi zibike choice yawe.",
    preferencesText: "Language na settings.",
    analyticsText: "Kumenya uko site ikoreshwa kugira ngo tuyinoze.",
    marketingText: "Campaigns cyangwa personalized content.",
    decline: "Refuser",
    accept: "Accepter",
    customize: "Personnaliser",
    save: "Bika choices",
    back: "Subira",
    more: "Privacy na cookies",
  },
} as const;

const necessaryOnlyChoice: CookieChoice = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
  savedAt: "",
};

const defaultChoice: CookieChoice = {
  necessary: true,
  preferences: true,
  analytics: true,
  marketing: true,
  savedAt: "",
};

const writeChoice = (choice: Omit<CookieChoice, "savedAt">) => {
  const finalChoice: CookieChoice = {
    ...choice,
    necessary: true,
    savedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(finalChoice));
  window.dispatchEvent(new CustomEvent("cp-cookie-consent-updated", { detail: finalChoice }));
};

const CookieConsent = () => {
  const isPrivateArea = window.location.pathname.startsWith("/secure-admin-");
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const labels = copy[locale] ?? copy.en;
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [choices, setChoices] = useState(defaultChoice);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVisible(!stored);
  }, []);

  const categories = useMemo(
    () => [
      { key: "preferences" as OptionalCookieKey, label: labels.preferences, text: labels.preferencesText },
      { key: "analytics" as OptionalCookieKey, label: labels.analytics, text: labels.analyticsText },
      { key: "marketing" as OptionalCookieKey, label: labels.marketing, text: labels.marketingText },
    ],
    [labels]
  );

  if (isPrivateArea || !visible) return null;

  const save = (choice: Omit<CookieChoice, "savedAt">) => {
    writeChoice(choice);
    setVisible(false);
  };

  return (
    <div className="cp-cookie-consent" role="dialog" aria-modal="true" aria-labelledby="cp-cookie-title">
      <div className="cp-cookie-panel">
        <div className="cp-cookie-copy">
          <p className="cp-cookie-eyebrow">Creativa Poeta</p>
          <h2 id="cp-cookie-title">{labels.title}</h2>
          <p>{labels.text}</p>
          <a href={localizePath("/confidentialite-cookies", market, locale)}>{labels.more}</a>
        </div>

        {customizing && (
          <div className="cp-cookie-options">
            <div className="cp-cookie-row is-locked">
              <div>
                <strong>{labels.necessary}</strong>
                <span>{labels.necessaryText}</span>
              </div>
              <em>ON</em>
            </div>
            {categories.map((category) => (
              <label key={category.key} className="cp-cookie-row">
                <div>
                  <strong>{category.label}</strong>
                  <span>{category.text}</span>
                </div>
                <input
                  type="checkbox"
                  checked={choices[category.key]}
                  onChange={(event) =>
                    setChoices((current) => ({ ...current, [category.key]: event.target.checked }))
                  }
                />
              </label>
            ))}
          </div>
        )}

        <div className="cp-cookie-actions">
          {customizing ? (
            <button type="button" className="cp-cookie-button cp-cookie-button-ghost" onClick={() => setCustomizing(false)}>
              {labels.back}
            </button>
          ) : (
            <button type="button" className="cp-cookie-button cp-cookie-button-ghost" onClick={() => save(necessaryOnlyChoice)}>
              {labels.decline}
            </button>
          )}
          {customizing ? (
            <button type="button" className="cp-cookie-button cp-cookie-button-primary" onClick={() => save(choices)}>
              {labels.save}
            </button>
          ) : (
            <>
              <button type="button" className="cp-cookie-button cp-cookie-button-outline" onClick={() => setCustomizing(true)}>
                {labels.customize}
              </button>
              <button
                type="button"
                className="cp-cookie-button cp-cookie-button-primary"
                onClick={() =>
                  save({ necessary: true, preferences: true, analytics: true, marketing: true })
                }
              >
                {labels.accept}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
