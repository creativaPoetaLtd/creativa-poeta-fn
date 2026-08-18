import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBullseye,
  FaCheck,
  FaChevronDown,
  FaLightbulb,
  FaMapMarkerAlt,
  FaSearch,
  FaStore,
  FaWhatsapp,
} from "react-icons/fa";
import { trackAnalyticsEvent } from "../analytics/analytics";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import { buildLocalLocalePath, getCurrentLocale, getCurrentMarket } from "../data/marketRuntime";
import referralPartnerGuideFocusedLocale, {
  type GuideItem,
} from "../i18n/ReferralPartnerGuideFocusedLocale";

const buttonClass =
  "inline-flex min-h-12 min-w-0 max-w-full items-center justify-center gap-2 whitespace-normal rounded-full px-4 py-3 text-center text-xs font-black leading-tight transition sm:px-6 sm:text-sm";
const panelClass = "rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md";

export default function ReferralPartnerGuideFocusedPage() {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = referralPartnerGuideFocusedLocale[locale] ?? referralPartnerGuideFocusedLocale.fr;
  const programPath = buildLocalLocalePath(market, locale, "/referral-partners");
  const [partnerId, setPartnerId] = useState("");
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  useEffect(() => {
    const storedPartnerId = window.sessionStorage.getItem("cp_referral_partner_id") || "";
    const access = window.sessionStorage.getItem("cp_referral_access") || "";
    if (storedPartnerId && access) setPartnerId(storedPartnerId);
    trackAnalyticsEvent("engagement", "referral_guide_view", {
      label: storedPartnerId && access ? "recognised_partner" : "public_visitor",
    });
  }, []);

  const signalFeedback = useMemo(() => {
    if (selectedSignals.length === 0) return copy.scoreZero;
    if (selectedSignals.length === 1) return copy.scoreLow;
    if (selectedSignals.length < 4) return copy.scoreGood;
    return copy.scoreStrong;
  }, [copy, selectedSignals.length]);

  const toggleSignal = (key: string, label: string) => {
    const isActive = selectedSignals.includes(key);
    setSelectedSignals((current) =>
      isActive ? current.filter((item) => item !== key) : [...current, key]
    );
    trackAnalyticsEvent("engagement", "referral_guide_signal_toggle", {
      label,
      value: isActive ? 0 : 1,
    });
  };

  const introductionPath = partnerId ? programPath : `${programPath}#submit-referral`;
  const helpMessage =
    locale === "fr"
      ? "Bonjour Creativa Poeta, j’aimerais vérifier une occasion avant de faire la mise en relation."
      : locale === "nl"
        ? "Hallo Creativa Poeta, ik wil graag een kans bespreken voordat ik de introductie maak."
        : locale === "kiny"
          ? "Muraho Creativa Poeta, ndifuza kubanza kubaza ku mahirwe nabonye mbere yo gukora introduction."
          : "Hello Creativa Poeta, I would like to check an opportunity before making the introduction.";
  const whatsAppHelpUrl = `https://wa.me/32473297112?text=${encodeURIComponent(helpMessage)}`;

  return (
    <PageLayout className="text-white">
      <MarketSEOHead {...seoConfig.referralGuide} path="/referral-partners/guide" />
      <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(5,12,22,.22),rgba(5,12,22,.72))] pt-24 sm:pt-28">
        <section className="mx-auto grid w-full max-w-6xl gap-7 px-4 pb-10 pt-5 md:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,.8fr)] lg:items-end lg:pb-12">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#EEBA2B] sm:text-sm">
              {copy.eyebrow}
            </p>
            <h1 className="mt-3 max-w-4xl text-[2.55rem] font-black leading-[.98] sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-slate-200 sm:text-lg">
              {copy.lead}
            </p>
            <div className="mt-6 grid max-w-xl grid-cols-2 gap-2.5">
              {!partnerId && (
                <Link
                  to={`${programPath}#join-cprpp`}
                  className={`${buttonClass} w-full bg-[#ffee00] text-black hover:bg-white`}
                >
                  {copy.start}
                  <FaArrowRight className="shrink-0" />
                </Link>
              )}
              <Link
                to={introductionPath}
                className={`${buttonClass} w-full ${partnerId ? "bg-[#ffee00] text-black hover:bg-white" : "border border-white/30 bg-black/20 text-white hover:border-[#EEBA2B]"}`}
              >
                {copy.introduce}
                <FaArrowRight className="shrink-0" />
              </Link>
            </div>
          </div>

          <aside className={`${panelClass} min-w-0 p-4 sm:p-5`}>
            <p className="text-[11px] font-black uppercase tracking-[.16em] text-[#EEBA2B]">
              {copy.contentsLabel}
            </p>
            <nav className="mt-3 grid grid-cols-2 gap-2" aria-label={copy.contentsLabel}>
              {copy.contents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-black text-slate-200 transition hover:border-[#EEBA2B] hover:text-white"
                >
                  <span className="text-[#EEBA2B]">0{index + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </section>

        <GuideSection id="targets">
          <SectionHeading icon={<FaBullseye />} title={copy.targetsTitle} text={copy.targetsLead} />
          <RevealList items={copy.targets} showAll={copy.showAll} showLess={copy.showLess} />
        </GuideSection>

        <GuideSection id="places" alternate>
          <SectionHeading icon={<FaMapMarkerAlt />} title={copy.placesTitle} text={copy.placesLead} />
          <RevealList items={copy.places} showAll={copy.showAll} showLess={copy.showLess} />
        </GuideSection>

        <GuideSection id="needs">
          <SectionHeading icon={<FaSearch />} title={copy.needsTitle} text={copy.needsLead} />

          <div className="mt-8">
            <h3 className="text-2xl font-black sm:text-3xl">{copy.methodsTitle}</h3>
            <RevealList items={copy.methods} showAll={copy.showAll} showLess={copy.showLess} />
          </div>

          <div className={`${panelClass} mt-10 p-4 sm:p-6`}>
            <div className="flex items-start gap-3">
              <FaLightbulb className="mt-1 shrink-0 text-2xl text-[#EEBA2B]" />
              <div>
                <h3 className="text-2xl font-black sm:text-3xl">{copy.detectorTitle}</h3>
                <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">
                  {copy.detectorLead}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {copy.signalGroups.map((group, groupIndex) => (
                <details
                  key={group.title}
                  className="group rounded-xl border border-white/15 bg-black/25 open:border-[#EEBA2B]/50"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-black marker:hidden">
                    <span>{group.title}</span>
                    <FaChevronDown className="shrink-0 text-[#EEBA2B] transition group-open:rotate-180" />
                  </summary>
                  <div className="grid gap-2 border-t border-white/10 p-3">
                    {group.items.map((signal, itemIndex) => {
                      const key = `${groupIndex}-${itemIndex}`;
                      const active = selectedSignals.includes(key);
                      return (
                        <button
                          key={signal.title}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleSignal(key, signal.title)}
                          className={`rounded-xl border p-3 text-left transition ${active ? "border-[#EEBA2B] bg-[#EEBA2B]/15" : "border-white/10 bg-white/[.03] hover:border-white/30"}`}
                        >
                          <span className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${active ? "border-[#EEBA2B] bg-[#EEBA2B] text-black" : "border-white/30 text-transparent"}`}
                            >
                              <FaCheck className="text-xs" />
                            </span>
                            <span>
                              <strong className="block text-sm font-black text-white sm:text-base">
                                {signal.title}
                              </strong>
                              <span className="mt-1 block text-sm font-semibold leading-relaxed text-slate-300">
                                {signal.text}
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#EEBA2B]/35 bg-[#EEBA2B]/10 p-4">
              <span className="flex h-10 min-w-10 items-center justify-center rounded-full bg-[#EEBA2B] font-black text-black">
                {selectedSignals.length}
              </span>
              <p className="text-sm font-black leading-relaxed text-slate-100">{signalFeedback}</p>
            </div>
          </div>
        </GuideSection>

        <GuideSection id="examples" alternate>
          <SectionHeading icon={<FaStore />} title={copy.casesTitle} text={copy.casesLead} />
          <div className="mt-7 grid items-start gap-3 md:grid-cols-2">
            {copy.cases.map((item, index) => (
              <details
                key={item.title}
                className={`${panelClass} group overflow-hidden open:border-[#EEBA2B]/50`}
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-4 py-3 marker:hidden sm:px-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEBA2B] text-xs font-black text-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-black leading-snug">{item.title}</span>
                  <FaChevronDown className="shrink-0 text-[#EEBA2B] transition group-open:rotate-180" />
                </summary>
                <div className="grid gap-4 border-t border-white/10 p-4 sm:p-5">
                  <CaseLine label={copy.caseSituationLabel} text={item.situation} />
                  <CaseLine label={copy.caseNeedLabel} text={item.need} />
                  <CaseLine label={copy.caseOpportunityLabel} text={item.opportunity} />
                </div>
              </details>
            ))}
          </div>
        </GuideSection>

        <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 sm:py-14">
          <div className="grid items-center gap-4 rounded-2xl border border-[#EEBA2B]/35 bg-[#EEBA2B]/10 p-5 backdrop-blur md:grid-cols-[1fr_auto] sm:p-6">
            <div>
              <h2 className="text-2xl font-black">{copy.helpTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-300">
                {copy.helpText}
              </p>
            </div>
            <a
              href={whatsAppHelpUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackAnalyticsEvent("click", "referral_guide_help_clicked", { target: "whatsapp" })
              }
              className={`${buttonClass} w-fit bg-[#25D366] text-slate-950 hover:bg-white`}
            >
              <FaWhatsapp />
              {copy.helpCta}
            </a>
          </div>
        </section>

        <section className="border-t border-white/10 bg-black/30 py-10 backdrop-blur-sm sm:py-14">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <h2 className="text-3xl font-black sm:text-4xl">{copy.finalTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">
              {copy.finalText}
            </p>
            <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2.5">
              {!partnerId && (
                <Link
                  to={`${programPath}#join-cprpp`}
                  className={`${buttonClass} w-full border border-white/30 text-white hover:border-[#EEBA2B]`}
                >
                  {copy.start}
                </Link>
              )}
              <Link
                to={introductionPath}
                className={`${buttonClass} w-full bg-[#ffee00] text-black hover:bg-white`}
              >
                {copy.introduce}
                <FaArrowRight className="shrink-0" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}

function GuideSection({
  id,
  children,
  alternate = false,
}: {
  id: string;
  children: ReactNode;
  alternate?: boolean;
}) {
  const content = (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 sm:py-14">{children}</div>
  );

  return alternate ? (
    <section id={id} className="scroll-mt-28 border-y border-white/10 bg-black/20 backdrop-blur-sm">
      {content}
    </section>
  ) : (
    <section id={id} className="scroll-mt-28">
      {content}
    </section>
  );
}

function SectionHeading({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div>
      <span className="inline-flex text-2xl text-[#EEBA2B]">{icon}</span>
      <h2 className="mt-3 text-3xl font-black sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">
        {text}
      </p>
    </div>
  );
}

function RevealList({
  items,
  showAll,
  showLess,
}: {
  items: GuideItem[];
  showAll: string;
  showLess: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div className="mt-7">
      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <li key={item.title} className={`${panelClass} flex min-h-full gap-3 p-4 sm:p-5`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEBA2B] text-xs font-black text-black">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-base font-black sm:text-lg">{item.title}</h3>
              <p className="mt-1.5 text-sm font-semibold leading-relaxed text-slate-300">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
      {items.length > 3 && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-black transition hover:border-[#EEBA2B] hover:text-[#ffee00]"
        >
          {expanded ? showLess : showAll}
          <FaChevronDown className={`transition ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[.12em] text-[#EEBA2B]">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}
