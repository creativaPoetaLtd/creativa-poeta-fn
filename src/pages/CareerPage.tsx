import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaBriefcase, FaCheck, FaClock, FaFileUpload, FaGlobeEurope, FaHandshake, FaLaptop, FaMapMarkerAlt, FaPaperPlane, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { CareerJob, getPublishedCareerJobs, submitCareerApplication } from "../APIs/CareerApi";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import { buildLocalLocalePath, getCurrentLocale, getCurrentMarket } from "../data/marketRuntime";
import careerLocale from "../i18n/CareerLocale";
import type { CareerDiscoverySource } from "../i18n/CareerLocale";

const controlClass = "min-h-12 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[#EEBA2B] focus:bg-black/30 focus:ring-2 focus:ring-[#EEBA2B]/20";
const labelClass = "mb-2 block text-[11px] font-black uppercase tracking-[.06em] text-slate-300 sm:text-xs";
const buttonClass = "inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-black leading-tight transition";

const initialApplication = {
  fullName: "", email: "", phone: "", country: "", desiredRole: "", skills: "", availability: "", message: "",
  discoverySource: "" as CareerDiscoverySource | "", discoverySourceOther: "", consentAccepted: false, websiteConfirmation: "",
};

export default function CareerPage() {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = careerLocale[locale] ?? careerLocale.fr;
  const referralPath = `${buildLocalLocalePath(market, locale, "/referral-partners")}#join-cprpp`;
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [application, setApplication] = useState(initialApplication);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let active = true;
    getPublishedCareerJobs()
      .then((response) => { if (active) setJobs(response.jobs || []); })
      .catch(() => { if (active) setJobs([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const dateLocale = locale === "kiny" ? "rw" : locale;
  const selectedTitle = selectedJob?.title || copy.spontaneousTitle;
  const selectedType = selectedJob ? copy.types[selectedJob.type] || selectedJob.type : "";
  const stats = useMemo(() => [
    { icon: <FaLaptop />, text: copy.statOne },
    { icon: <FaGlobeEurope />, text: copy.statTwo },
    { icon: <FaBriefcase />, text: copy.statThree },
  ], [copy]);

  const chooseJob = (job: CareerJob | null) => {
    setSelectedJob(job);
    setApplication((current) => ({ ...current, desiredRole: job?.title || current.desiredRole }));
    window.requestAnimationFrame(() => document.getElementById("career-application")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!application.email.trim() && !application.phone.trim()) {
      toast.error(copy.contactError);
      return;
    }
    try {
      setSending(true);
      await submitCareerApplication({ ...application, discoverySource: application.discoverySource as CareerDiscoverySource, jobId: selectedJob?._id, locale }, cvFile);
      toast.success(copy.success);
      setApplication(initialApplication);
      setCvFile(null);
      setSelectedJob(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.error);
    } finally { setSending(false); }
  };

  const selectCv = (file?: File) => {
    if (!file) { setCvFile(null); return; }
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type) || file.size > 4 * 1024 * 1024) {
      toast.error(copy.cvHint);
      return;
    }
    setCvFile(file);
  };

  return <PageLayout className="text-white">
    <MarketSEOHead {...seoConfig.career} path="/career" />
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(5,12,22,.22),rgba(5,12,22,.68))]">
      <section className="relative overflow-hidden border-b border-white/10 bg-black/10 pt-28 backdrop-blur-[1px] sm:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(1,10,23,.42),rgba(7,26,51,.16)_62%,rgba(7,26,51,.08))]" />
        <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-4 pb-12 md:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,.75fr)] lg:pb-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#EEBA2B]">{copy.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">{copy.title}</h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-slate-300 sm:text-lg">{copy.lead}</p>
            <div className="mt-7 grid max-w-xl grid-cols-2 gap-2.5">
              <a href="#career-opportunities" className={`${buttonClass} w-full bg-[#ffee00] text-black hover:bg-white`}>{copy.primaryCta}<FaArrowRight /></a>
              <button type="button" onClick={() => chooseJob(null)} className={`${buttonClass} w-full border border-white/35 bg-black/20 text-white backdrop-blur hover:border-[#EEBA2B] hover:text-[#ffee00]`}>{copy.secondaryCta}</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-black/25 p-3 backdrop-blur-md sm:p-4 lg:grid-cols-1">
            {stats.map((item) => <div key={item.text} className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-2 py-3 text-center lg:flex-row lg:text-left"><span className="text-[#EEBA2B]">{item.icon}</span><span className="text-[10px] font-black uppercase leading-tight text-slate-200 sm:text-xs">{item.text}</span></div>)}
          </div>
        </div>
      </section>

      <section id="career-opportunities" className="scroll-mt-24 bg-black/10 py-10 backdrop-blur-[1px] sm:py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-6"><h2 className="text-3xl font-black sm:text-4xl">{copy.openTitle}</h2><p className="mt-2 max-w-2xl text-sm font-semibold text-slate-400 sm:text-base">{copy.openLead}</p></div>
          <div className="grid items-start gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#EEBA2B]/45 bg-[linear-gradient(145deg,rgba(238,186,43,.13),rgba(3,10,20,.24))] p-5 backdrop-blur-md sm:p-7">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-[.18em] text-[#ffee00]">{copy.referralEyebrow}</p><h3 className="mt-2 text-2xl font-black sm:text-3xl">{copy.referralTitle}</h3></div><span className="rounded-full border border-[#EEBA2B]/40 bg-black/25 p-3 text-[#ffee00]"><FaHandshake /></span></div>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-200 sm:text-base">{copy.referralLead}</p>
              <p className="mt-3 text-xs font-bold leading-relaxed text-slate-400">{copy.referralNote}</p>
              <a href={referralPath} className={`${buttonClass} mt-5 bg-[#ffee00] text-black hover:bg-white`}>{copy.referralCta}<FaArrowRight /></a>
            </article>

            {loading ? <div className="min-h-64 animate-pulse rounded-2xl border border-white/10 bg-white/[.04]" /> : jobs.length === 0 ? (
              <article className="rounded-2xl border border-white/15 bg-black/20 p-5 backdrop-blur-md sm:p-7">
                <span className="inline-flex rounded-full border border-white/15 bg-white/5 p-3 text-[#EEBA2B]"><FaClock /></span>
                <h3 className="mt-4 text-2xl font-black">{copy.noJobsTitle}</h3><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">{copy.noJobsLead}</p>
                <button type="button" onClick={() => chooseJob(null)} className={`${buttonClass} mt-5 border border-white/30 text-white hover:border-[#EEBA2B] hover:text-[#ffee00]`}>{copy.secondaryCta}<FaArrowRight /></button>
              </article>
            ) : <div className="grid gap-3">{jobs.map((job) => <article key={job._id} className="rounded-2xl border border-white/15 bg-black/20 p-5 backdrop-blur-md transition hover:border-[#EEBA2B]/60">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#EEBA2B]">{job.department || job.company}</p><h3 className="mt-1 text-xl font-black">{job.title}</h3></div><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-black uppercase text-slate-300">{copy.types[job.type] || job.type}</span></div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-slate-400"><span className="inline-flex items-center gap-1"><FaMapMarkerAlt />{job.isRemote ? copy.remote : job.location}</span>{job.applicationDeadline && <span className="inline-flex items-center gap-1"><FaClock />{copy.deadline}: {new Intl.DateTimeFormat(dateLocale, { dateStyle: "medium" }).format(new Date(job.applicationDeadline))}</span>}</div>
              <p className="mt-3 line-clamp-3 text-sm font-semibold leading-relaxed text-slate-300">{job.summary || job.description}</p>
              <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setExpandedJobId(expandedJobId === job._id ? null : job._id)} className={`${buttonClass} border border-white/25 text-white hover:border-[#EEBA2B]`}>{copy.details}</button><button type="button" onClick={() => chooseJob(job)} className={`${buttonClass} bg-[#ffee00] text-black hover:bg-white`}>{copy.apply}<FaArrowRight /></button></div>
              {expandedJobId === job._id && <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 text-sm text-slate-300"><p className="whitespace-pre-wrap font-semibold leading-relaxed">{job.description}</p><JobList title={copy.responsibilities} items={job.responsibilities} /><JobList title={copy.requirements} items={job.requirements} /><JobList title={copy.benefits} items={job.benefits} /></div>}
            </article>)}</div>}
          </div>
        </div>
      </section>

      <section id="career-application" className="scroll-mt-24 border-y border-white/10 bg-black/10 py-10 backdrop-blur-[1px] sm:py-14">
        <div className="mx-auto grid max-w-6xl items-start gap-7 px-4 md:px-8 lg:grid-cols-[minmax(15rem,.7fr)_minmax(0,1.3fr)]">
          <div className="lg:sticky lg:top-28"><p className="text-xs font-black uppercase tracking-[.2em] text-[#EEBA2B]">{copy.formEyebrow}</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">{selectedJob ? copy.jobFormTitle : copy.spontaneousTitle}</h2><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">{copy.formLead}</p>{selectedJob && <div className="mt-5 rounded-xl border border-[#EEBA2B]/35 bg-[#EEBA2B]/10 p-4"><p className="text-xs font-black uppercase text-[#ffee00]">{selectedType}</p><p className="mt-1 font-black">{selectedTitle}</p><button type="button" onClick={() => { setSelectedJob(null); setApplication((current) => ({ ...current, desiredRole: "" })); }} className="mt-3 inline-flex items-center gap-2 text-xs font-black text-slate-300 hover:text-white"><FaTimes />{copy.spontaneousTitle}</button></div>}</div>
          <form onSubmit={submit} encType="multipart/form-data" className="grid gap-4 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-md sm:grid-cols-2 sm:p-6">
            <FormField label={copy.labels.fullName}><input required className={controlClass} value={application.fullName} onChange={(event) => setApplication({ ...application, fullName: event.target.value })} /></FormField>
            <FormField label={copy.labels.country}><input className={controlClass} value={application.country} onChange={(event) => setApplication({ ...application, country: event.target.value })} /></FormField>
            <FormField label={copy.labels.email}><input type="email" className={controlClass} value={application.email} onChange={(event) => setApplication({ ...application, email: event.target.value })} /></FormField>
            <FormField label={copy.labels.phone}><input type="tel" className={controlClass} value={application.phone} onChange={(event) => setApplication({ ...application, phone: event.target.value })} /></FormField>
            <FormField label={copy.labels.desiredRole}><input className={controlClass} value={application.desiredRole} onChange={(event) => setApplication({ ...application, desiredRole: event.target.value })} /></FormField>
            <FormField label={copy.labels.availability}><input className={controlClass} value={application.availability} onChange={(event) => setApplication({ ...application, availability: event.target.value })} /></FormField>
            <FormField label={copy.labels.skills} wide><textarea rows={3} className={controlClass} value={application.skills} onChange={(event) => setApplication({ ...application, skills: event.target.value })} /></FormField>
            <FormField label={copy.labels.discoverySource} wide><select required className={controlClass} value={application.discoverySource} onChange={(event) => setApplication({ ...application, discoverySource: event.target.value as CareerDiscoverySource, discoverySourceOther: event.target.value === "other" ? application.discoverySourceOther : "" })}><option className="bg-slate-950" value="" disabled>—</option>{copy.discoveryOptions.map((option) => <option className="bg-slate-950" key={option.value} value={option.value}>{option.label}</option>)}</select></FormField>
            {application.discoverySource === "other" && <FormField label={copy.labels.discoveryOther} wide><input required className={controlClass} value={application.discoverySourceOther} onChange={(event) => setApplication({ ...application, discoverySourceOther: event.target.value })} /></FormField>}
            <div className="sm:col-span-2"><FieldLabel label={copy.labels.cv} /><label htmlFor="career-cv" className="flex min-h-20 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/25 bg-black/15 px-4 py-3 transition hover:border-[#EEBA2B] hover:bg-black/25"><span className="rounded-full bg-[#EEBA2B]/15 p-3 text-[#ffee00]"><FaFileUpload /></span><span className="min-w-0"><span className="block truncate text-sm font-black text-white">{cvFile ? `${copy.cvSelected}: ${cvFile.name}` : copy.labels.cv.replace(/\s*\([^)]+\)\s*$/, "")}</span><span className="mt-1 block text-xs font-semibold text-slate-400">{copy.cvHint}</span></span></label><input id="career-cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={(event) => selectCv(event.target.files?.[0])} /></div>
            <FormField label={copy.labels.message} wide><textarea rows={5} placeholder={copy.messagePlaceholder} className={controlClass} value={application.message} onChange={(event) => setApplication({ ...application, message: event.target.value })} /></FormField>
            <div className="hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={application.websiteConfirmation} onChange={(event) => setApplication({ ...application, websiteConfirmation: event.target.value })} /></label></div>
            <label className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-slate-300 sm:col-span-2"><input required type="checkbox" className="mt-1 h-4 w-4 accent-[#EEBA2B]" checked={application.consentAccepted} onChange={(event) => setApplication({ ...application, consentAccepted: event.target.checked })} /><span>{copy.consent}</span></label>
            <div className="flex justify-start sm:col-span-2"><button disabled={sending} className={`${buttonClass} min-w-[13rem] bg-[#ffee00] text-black hover:bg-white disabled:opacity-60`}>{sending ? copy.submitting : copy.submit}<FaPaperPlane /></button></div>
          </form>
        </div>
      </section>
    </main>
  </PageLayout>;
}

function FormField({ label, wide = false, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return <label className={`block min-w-0 ${wide ? "sm:col-span-2" : ""}`}><FieldLabel label={label} />{children}</label>;
}

function FieldLabel({ label }: { label: string }) {
  const optional = label.match(/^(.*?)\s*\(([^)]+)\)$/);
  return <span className={labelClass}>{optional ? <>{optional[1]} <span className="font-normal normal-case tracking-normal text-slate-400">({optional[2].toLowerCase()})</span></> : label}</span>;
}

function JobList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return <div><h4 className="font-black text-white">{title}</h4><ul className="mt-2 grid gap-1.5">{items.map((item) => <li key={item} className="flex gap-2"><FaCheck className="mt-1 shrink-0 text-[#EEBA2B]" /><span>{item}</span></li>)}</ul></div>;
}
