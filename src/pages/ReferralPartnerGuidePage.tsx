import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaCheck,
  FaClipboardCheck,
  FaCopy,
  FaEnvelope,
  FaEye,
  FaHandshake,
  FaLightbulb,
  FaLinkedin,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaSearch,
  FaShieldAlt,
  FaUserCheck,
  FaWhatsapp,
} from "react-icons/fa";
import { trackAnalyticsEvent } from "../analytics/analytics";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import { buildLocalLocalePath, getCurrentLocale, getCurrentMarket } from "../data/marketRuntime";
import referralPartnerGuideLocale from "../i18n/ReferralPartnerGuideLocale";

const buttonClass =
  "inline-flex min-h-12 min-w-0 max-w-full items-center justify-center gap-2 whitespace-normal break-words rounded-full px-3 py-3 text-center text-xs font-black leading-tight transition sm:px-6 sm:text-sm";
const panelClass = "rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md";

const channelIcon = (channel: string) => {
  const normalized = channel.toLowerCase();
  if (normalized.includes("whatsapp")) return FaWhatsapp;
  if (normalized.includes("mail")) return FaEnvelope;
  if (normalized.includes("linkedin")) return FaLinkedin;
  return FaHandshake;
};

export default function ReferralPartnerGuidePage() {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = referralPartnerGuideLocale[locale] ?? referralPartnerGuideLocale.fr;
  const programPath = buildLocalLocalePath(market, locale, "/referral-partners");
  const termsPath = buildLocalLocalePath(market, locale, "/referral-program-terms");
  const [partnerId, setPartnerId] = useState("");
  const [selectedSignals, setSelectedSignals] = useState<number[]>([]);
  const [copiedTemplate, setCopiedTemplate] = useState<number | null>(null);

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

  const toggleSignal = (index: number) => {
    setSelectedSignals((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
    trackAnalyticsEvent("engagement", "referral_guide_signal_toggle", {
      label: copy.signals[index]?.title,
      value: selectedSignals.includes(index) ? 0 : 1,
    });
  };

  const copyTemplate = async (index: number) => {
    try {
      await navigator.clipboard.writeText(copy.templates[index].text);
      setCopiedTemplate(index);
      window.setTimeout(() => setCopiedTemplate((current) => (current === index ? null : current)), 2200);
      trackAnalyticsEvent("click", "referral_guide_template_copied", {
        label: copy.templates[index].channel,
        target: "clipboard",
      });
    } catch {
      setCopiedTemplate(null);
    }
  };

  const introductionPath = partnerId ? programPath : `${programPath}#submit-referral`;
  const whatsAppHelpUrl = `https://wa.me/32473297112?text=${encodeURIComponent(
    locale === "fr"
      ? "Bonjour Creativa Poeta, j’aimerais vérifier une occasion avant de faire la mise en relation."
      : locale === "nl"
      ? "Hallo Creativa Poeta, ik wil graag een kans bespreken voordat ik de introductie maak."
      : locale === "kiny"
      ? "Muraho Creativa Poeta, ndifuza kubanza kubaza ku mahirwe nabonye mbere yo gukora introduction."
      : "Hello Creativa Poeta, I would like to check an opportunity before making the introduction."
  )}`;

  return (
    <PageLayout className="text-white">
      <MarketSEOHead {...seoConfig.referralGuide} path="/referral-partners/guide" />
      <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(5,12,22,.25),rgba(5,12,22,.72))] pt-24 sm:pt-28">
        <section className="mx-auto grid w-full max-w-6xl gap-7 px-4 pb-9 pt-5 md:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,.8fr)] lg:items-end lg:pb-12">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#EEBA2B] sm:text-sm">{copy.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-[2.55rem] font-black leading-[.98] sm:text-6xl lg:text-7xl">{copy.title}</h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-slate-200 sm:text-lg">{copy.lead}</p>
            <div className="mt-6 grid max-w-xl grid-cols-2 gap-2.5">
              {!partnerId && <Link to={`${programPath}#join-cprpp`} className={`${buttonClass} w-full bg-[#ffee00] text-black hover:bg-white`}>{copy.start}<FaArrowRight className="shrink-0" /></Link>}
              <Link to={introductionPath} className={`${buttonClass} w-full ${partnerId ? "bg-[#ffee00] text-black hover:bg-white" : "border border-white/30 bg-black/20 text-white hover:border-[#EEBA2B]"}`}>{copy.introduce}<FaArrowRight className="shrink-0" /></Link>
            </div>
          </div>
          <aside className={`${panelClass} min-w-0 p-4 sm:p-5`}>
            <p className="text-[11px] font-black uppercase tracking-[.16em] text-[#EEBA2B]">{copy.contentsLabel}</p>
            <nav className="mt-3 grid grid-cols-2 gap-2" aria-label={copy.contentsLabel}>
              {copy.contents.map((item, index) => <a key={item.id} href={`#${item.id}`} className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-black text-slate-200 hover:border-[#EEBA2B] hover:text-white"><span className="text-[#EEBA2B]">0{index + 1}</span>{item.label}</a>)}
            </nav>
          </aside>
        </section>

        <section className="border-y border-white/10 bg-black/20 py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-start gap-3"><FaShieldAlt className="mt-1 shrink-0 text-[#EEBA2B]" /><div><p className="text-sm font-bold leading-relaxed text-slate-200">{partnerId ? copy.partnerNotice : copy.publicNotice}</p>{partnerId && <p className="mt-1 text-xs font-black text-[#ffee00]">{copy.partnerIdLabel}: {partnerId}</p>}</div></div>
            <Link to={introductionPath} className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-black text-[#ffee00] hover:text-white md:self-auto">{copy.introduce}<FaArrowRight /></Link>
          </div>
        </section>

        <section id="role" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10 md:px-8 sm:py-14">
          <SectionHeading icon={<FaUserCheck />} title={copy.roleTitle} text={copy.roleLead} />
          <div className="mt-6 grid gap-3 md:grid-cols-3">{copy.roleCards.map((card, index) => <article key={card.title} className={`${panelClass} flex gap-3 p-4 sm:block sm:p-5`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEBA2B] text-sm font-black text-black">{index + 1}</span><div><h3 className="text-lg font-black sm:mt-4 sm:text-xl">{card.title}</h3><p className="mt-1 text-sm font-semibold leading-relaxed text-slate-300">{card.text}</p></div></article>)}</div>
        </section>

        <section id="signals" className="scroll-mt-28 border-y border-white/10 bg-black/20 py-10 backdrop-blur-sm sm:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <SectionHeading icon={<FaSearch />} title={copy.signalsTitle} text={copy.signalsLead} />
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{copy.signals.map((signal, index) => {
              const active = selectedSignals.includes(index);
              return <button key={signal.title} type="button" aria-pressed={active} onClick={() => toggleSignal(index)} className={`min-h-[7.5rem] rounded-xl border p-4 text-left transition ${active ? "border-[#EEBA2B] bg-[#EEBA2B]/15" : "border-white/15 bg-black/20 hover:border-white/35"}`}><span className="flex items-start gap-3"><span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${active ? "border-[#EEBA2B] bg-[#EEBA2B] text-black" : "border-white/30 text-transparent"}`}><FaCheck className="text-xs" /></span><span><strong className="block text-base font-black text-white">{signal.title}</strong><span className="mt-1 block text-sm font-semibold leading-relaxed text-slate-300">{signal.text}</span></span></span></button>;
            })}</div>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#EEBA2B]/35 bg-[#EEBA2B]/10 p-4"><span className="flex h-10 min-w-10 items-center justify-center rounded-full bg-[#EEBA2B] font-black text-black">{selectedSignals.length}</span><p className="text-sm font-black leading-relaxed text-slate-100">{signalFeedback}</p></div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-2 sm:py-14">
          <div>
            <SectionHeading icon={<FaMapMarkerAlt />} title={copy.placesTitle} text={copy.placesLead} compact />
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">{copy.places.map((item) => <article key={item.title} className={`${panelClass} p-4`}><h3 className="font-black text-[#ffee00]">{item.title}</h3><p className="mt-1.5 text-sm font-semibold leading-relaxed text-slate-300">{item.text}</p></article>)}</div>
          </div>
          <div>
            <SectionHeading icon={<FaQuestionCircle />} title={copy.needsTitle} text={copy.needsLead} compact />
            <ol className="mt-5 grid gap-2.5">{copy.questions.map((question, index) => <li key={question} className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm font-bold leading-relaxed text-slate-200"><span className="text-[#EEBA2B]">0{index + 1}</span>{question}</li>)}</ol>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/20 py-10 backdrop-blur-sm sm:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <SectionHeading icon={<FaLightbulb />} title={copy.outcomesTitle} text={copy.outcomesLead} />
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">{copy.outcomes.map((item) => <article key={item.need} className="grid gap-2 rounded-xl border border-white/15 bg-black/20 p-4 sm:grid-cols-[minmax(9rem,.45fr)_1fr] sm:items-center"><h3 className="font-black text-[#ffee00]">{item.need}</h3><p className="text-sm font-semibold leading-relaxed text-slate-300">{item.outcome}</p></article>)}</div>
          </div>
        </section>

        <section id="messages" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10 md:px-8 sm:py-14">
          <SectionHeading icon={<FaCopy />} title={copy.templatesTitle} text={copy.templatesLead} />
          <div className="mt-6 grid gap-3 md:grid-cols-2">{copy.templates.map((template, index) => {
            const Icon = channelIcon(template.channel);
            return <article key={`${template.channel}-${template.title}`} className={`${panelClass} flex min-h-full flex-col p-4 sm:p-5`}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><Icon className="text-[#EEBA2B]" /><span className="text-xs font-black uppercase tracking-[.12em] text-[#EEBA2B]">{template.channel}</span></div><button type="button" onClick={() => void copyTemplate(index)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-3 text-xs font-black hover:border-[#EEBA2B] hover:text-[#ffee00]"><FaCopy />{copiedTemplate === index ? copy.copied : copy.copy}</button></div><h3 className="mt-3 text-lg font-black">{template.title}</h3><p className="mt-2 flex-1 whitespace-pre-line text-sm font-semibold leading-relaxed text-slate-300">{template.text}</p></article>;
          })}</div>
        </section>

        <section className="border-y border-white/10 bg-black/20 py-10 backdrop-blur-sm sm:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8"><SectionHeading icon={<FaEye />} title={copy.casesTitle} /><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{copy.cases.map((item) => <article key={item.title} className={`${panelClass} p-4`}><h3 className="text-lg font-black">{item.title}</h3><p className="mt-3 text-xs font-black uppercase tracking-wide text-[#EEBA2B]">{copy.caseSignalLabel}</p><p className="mt-1 text-sm font-semibold leading-relaxed text-slate-300">{item.signal}</p><p className="mt-3 text-xs font-black uppercase tracking-wide text-[#EEBA2B]">{copy.caseApproachLabel}</p><p className="mt-1 text-sm font-semibold leading-relaxed text-slate-300">{item.approach}</p></article>)}</div></div>
        </section>

        <section id="rules" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10 md:px-8 sm:py-14">
          <SectionHeading icon={<FaShieldAlt />} title={copy.validationTitle} text={copy.validationLead} />
          <div className="mt-6 grid gap-4 md:grid-cols-2"><RuleList title={copy.validTitle} items={copy.valid} positive /><RuleList title={copy.avoidTitle} items={copy.avoid} /></div>
          <Link to={termsPath} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#ffee00] underline-offset-4 hover:text-white hover:underline">{locale === "fr" ? "Lire les conditions complètes" : locale === "nl" ? "Lees de volledige voorwaarden" : locale === "kiny" ? "Soma amategeko yose" : "Read the full program terms"}<FaArrowRight /></Link>
        </section>

        <section className="border-y border-white/10 bg-black/20 py-10 backdrop-blur-sm sm:py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-8"><SectionHeading icon={<FaClipboardCheck />} title={copy.processTitle} /><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{copy.process.map((item) => <article key={item.title} className={`${panelClass} p-4`}><h3 className="font-black text-[#ffee00]">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-relaxed text-slate-300">{item.text}</p></article>)}</div></div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:px-8 lg:grid-cols-2 sm:py-14">
          <article className={`${panelClass} p-5 sm:p-6`}><FaHandshake className="text-2xl text-[#EEBA2B]" /><h2 className="mt-3 text-2xl font-black">{copy.rewardTitle}</h2><p className="mt-2 text-sm font-semibold leading-relaxed text-slate-300">{copy.rewardText}</p><p className="mt-4 rounded-xl bg-[#EEBA2B] p-3 text-sm font-black text-black">{copy.rewardExample}</p></article>
          <article className={`${panelClass} p-5 sm:p-6`}><FaBriefcase className="text-2xl text-[#EEBA2B]" /><h2 className="mt-3 text-2xl font-black">{copy.growthTitle}</h2><p className="mt-2 text-sm font-semibold leading-relaxed text-slate-300">{copy.growthText}</p><Link to={`${programPath}#business-partners`} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#ffee00] hover:text-white">{copy.start}<FaArrowRight /></Link></article>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-8 sm:pb-14"><div className="grid items-center gap-4 rounded-2xl border border-[#EEBA2B]/35 bg-[#EEBA2B]/10 p-5 backdrop-blur md:grid-cols-[1fr_auto] sm:p-6"><div><h2 className="text-2xl font-black">{copy.helpTitle}</h2><p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-300">{copy.helpText}</p></div><a href={whatsAppHelpUrl} target="_blank" rel="noreferrer" onClick={() => trackAnalyticsEvent("click", "referral_guide_help_clicked", { target: "whatsapp" })} className={`${buttonClass} w-fit bg-[#25D366] text-slate-950 hover:bg-white`}><FaWhatsapp />{copy.helpCta}</a></div></section>

        <section className="border-t border-white/10 bg-black/30 py-10 backdrop-blur-sm sm:py-14"><div className="mx-auto max-w-4xl px-4 text-center md:px-8"><h2 className="text-3xl font-black sm:text-4xl">{copy.finalTitle}</h2><p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">{copy.finalText}</p><div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2.5">{!partnerId && <Link to={`${programPath}#join-cprpp`} className={`${buttonClass} w-full border border-white/30 text-white hover:border-[#EEBA2B]`}>{copy.start}</Link>}<Link to={introductionPath} className={`${buttonClass} w-full bg-[#ffee00] text-black hover:bg-white`}>{copy.introduce}<FaArrowRight className="shrink-0" /></Link></div></div></section>
      </main>
    </PageLayout>
  );
}

function SectionHeading({ icon, title, text, compact = false }: { icon: React.ReactNode; title: string; text?: string; compact?: boolean }) {
  return <div><span className="inline-flex text-2xl text-[#EEBA2B]">{icon}</span><h2 className={`mt-3 font-black ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>{title}</h2>{text && <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">{text}</p>}</div>;
}

function RuleList({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return <article className={`${panelClass} p-4 sm:p-5`}><h3 className={`text-xl font-black ${positive ? "text-emerald-300" : "text-red-300"}`}>{title}</h3><ul className="mt-4 grid gap-2">{items.map((item) => <li key={item} className={`flex gap-2 rounded-lg p-3 text-sm font-bold leading-relaxed ${positive ? "bg-emerald-500/10" : "bg-red-500/10"}`}><FaCheck className={`mt-1 shrink-0 ${positive ? "text-emerald-300" : "rotate-45 text-red-300"}`} />{item}</li>)}</ul></article>;
}
