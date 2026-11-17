import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Expand, Mail, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { getCurrentLocale, getCurrentMarket, getLocaleFromPathname, getPathWithoutLocale, localizePath } from "../data/marketRuntime";
import { artCollections, artMaterials, type ArtCollection, type ArtImage, type ArtLanguage, type ArtWork } from "../data/artCatalog";
import { artLocale } from "../i18n/ArtLocale";
import { artCommerceLocale } from "../i18n/ArtCommerceLocale";
import { useArtCatalog, useArtSelection } from "../contexts/ArtContext";
import { ART_COUNTRIES, artCountryName, artMoney, fetchArtQuote, submitArtRequest, type ArtQuote } from "../APIs/Art";
import "./ArtPage.css";

function useArt() {
  const { pathname } = useLocation();
  const locale = getLocaleFromPathname(pathname) ?? getCurrentLocale();
  const language: ArtLanguage = locale === "fr" || locale === "nl" ? locale : "en";
  return { language, copy: { ...artLocale[language], ...artCommerceLocale[language] }, path: (value: string) => localizePath(value, getCurrentMarket(), language) };
}

function ArtVisual({ visual, language, title, className = "", eager = false, image }: {
  visual: ArtCollection["visual"]; language: ArtLanguage; title?: string; className?: string; eager?: boolean; image?: ArtImage;
}) {
  if (image) return <img className={`art-visual ${className}`} src={image.url} alt={image.alt[language] || title || ""} loading={eager ? "eager" : "lazy"} />;
  if (visual === "landscape" || visual === "architecture") {
    const names = visual === "landscape"
      ? { fr: "Une silhouette devant une arche en pierre, au bord d’une rivière et d’un horizon lumineux", en: "A figure at a stone arch beside a river and a luminous horizon", nl: "Een figuur bij een stenen boog naast een rivier en een lichte horizon" }
      : { fr: "Un passage aux murs ocre et terre cuite, une porte bleue et une jeune plante", en: "A passage with ochre and terracotta walls, a blue door and a young plant", nl: "Een doorgang met oker- en terracottamuren, een blauwe deur en een jonge plant" };
    return <img className={`art-visual ${className}`} src={`/art/studies/${visual === "landscape" ? "le-passage" : "memoire-des-lieux"}.webp`} alt={title ? `${title} — ${names[language]}` : names[language]} loading={eager ? "eager" : "lazy"} width={visual === "landscape" ? 1536 : 1120} height={visual === "landscape" ? 1024 : 1400} />;
  }
  const phrases = {
    words: { fr: ["Chaque jour,", "un nouveau", "départ."], en: ["Every day,", "a new", "beginning."], nl: ["Elke dag,", "een nieuw", "begin."] },
    faith: { fr: ["La foi", "ouvre", "un chemin."], en: ["Faith", "opens", "a path."], nl: ["Geloof", "opent", "een weg."] },
    custom: { fr: ["Votre", "histoire,", "ici."], en: ["Your", "story,", "here."], nl: ["Uw", "verhaal,", "hier."] },
  };
  return <div className={`art-type art-type--${visual} ${className}`}>
    <span className="art-type__mark" aria-hidden="true">CP / ART</span>
    <div>{phrases[visual][language].map((line, index) => <span key={line} className={index === 2 ? "art-type__accent" : ""}>{line}</span>)}</div>
    <span className="art-type__foot" aria-hidden="true">CREATIVA POETA</span>
  </div>;
}

function ArtShell({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  const { copy, language, path } = useArt();
  const { pathname } = useLocation();
  const { preview } = useArtCatalog();
  const { items } = useArtSelection();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [pathname]);
  const links = [{ label: copy.collections, href: "/art/collections" }, { label: copy.gallery, href: "/art/galerie" }, { label: copy.custom, href: "/art/personnalisation" }];
  return <div className="art-app">
    <MarketSEOHead title={`${title} | Creativa Poeta Art`} description={description} />
    <Helmet><body className="cp-art-body" /><html lang={language} /><meta name="robots" content="noindex, nofollow" /></Helmet>
    <a className="art-skip" href="#art-main">{copy.gallery}</a>
    <div className="art-preview">{preview ? copy.preview : copy.catalogNotice}</div>
    <header className="art-header art-container">
      <Link to={path("/art")} className="art-brand" aria-label="Creativa Poeta Art">
        <span className="art-brand__monogram" aria-hidden="true">cp<span>●</span></span>
        <span className="art-brand__name">creativa poeta<span>ART</span></span>
      </Link>
      <nav className={`art-nav ${menuOpen ? "is-open" : ""}`} aria-label="Creativa Poeta Art" id="art-navigation">
        {links.map(link => <Link key={link.href} to={path(link.href)} aria-current={getPathWithoutLocale(pathname).startsWith(link.href) ? "page" : undefined}>{link.label}</Link>)}
        <Link to={`${path("/art")}#notre-regard`}>{copy.about}</Link>
      </nav>
      <div className="art-header__right"><nav className="art-language" aria-label={copy.language}>
        {(["fr", "en", "nl"] as const).map(locale => <Link key={locale} lang={locale} to={localizePath(getPathWithoutLocale(pathname), getCurrentMarket(), locale)} aria-label={{ fr: "Français", en: "English", nl: "Nederlands" }[locale]} aria-current={locale === language ? "true" : undefined}>{locale.toUpperCase()}</Link>)}
      </nav>{!preview && <Link className="art-selection-link" to={path("/art/selection")} aria-label={`${copy.selectionTitle} (${items.reduce((sum, item) => sum + item.quantity, 0)})`}><ShoppingBag size={18} /><span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span></Link>}<button type="button" className="art-menu-toggle" aria-label={menuOpen ? copy.close : copy.menu} aria-expanded={menuOpen} aria-controls="art-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <main id="art-main">{children}</main>
    <footer className="art-footer"><div className="art-container">
      <div className="art-footer__top"><Link className="art-footer__brand" to={path("/art")}>creativa poeta <em>art.</em></Link><p>{copy.footerLine}</p><a href="mailto:contact@creativapoeta.com">{copy.contact}<ArrowUpRight /></a></div>
      <div className="art-footer__bottom"><span>© {new Date().getFullYear()} · {copy.rights}</span><Link to={path("/")}>{copy.parent}<ArrowRight size={14} /></Link><Link to={path("/mentions-legales")}>{copy.legal}</Link></div>
    </div></footer>
  </div>;
}

function ArrowUpRight() { return <ArrowRight size={17} className="art-diagonal" aria-hidden="true" />; }
function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="art-section-heading"><p className="art-eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="art-section-intro">{children}</p>}</div>;
}

function CollectionCards() {
  const { language, copy, path } = useArt();
  return <div className="art-collections">{artCollections.map(collection => <Link key={collection.slug} to={path(collection.slug === "made-for-you" ? "/art/personnalisation" : `/art/collections/${collection.slug}`)} className="art-collection-card">
    <div className={`art-collection-card__visual art-collection-card__visual--${collection.visual}`}><ArtVisual visual={collection.visual} language={language} /><span className="art-collection-card__number">{collection.number}</span><span className="art-collection-card__arrow"><ArrowUpRight /></span></div>
    <h3>{collection.name}</h3><p>{collection.subtitle[language]}</p><span className="art-sr-only">{copy.discover}</span>
  </Link>)}</div>;
}

function WorkCard({ work }: { work: ArtWork }) {
  const { language, copy, path } = useArt();
  const collection = artCollections.find(item => item.slug === work.collection)!;
  return <Link to={path(`/art/oeuvres/${work.slug}`)} className="art-work-card">
    <div className={`art-work-card__mount art-work-card__mount--${work.visual}`}><div className={`art-frame art-frame--${work.orientation}`}><ArtVisual visual={work.visual} language={language} title={work.title[language]} image={work.images?.[0]} /></div><span className="art-work-card__view"><ArrowUpRight /><span>{copy.view}</span></span></div>
    <div className="art-work-card__caption"><div><p>{collection.name}</p><h3>{work.title[language]}</h3>{!work.isDemo && !!work.variants?.length && <p className="art-price">{copy.from} {artMoney(Math.min(...work.variants.map(item => item.priceCents)), language)}</p>}</div>{work.isDemo && <span>{copy.specimen}</span>}</div>
  </Link>;
}

function MadeForYouBanner() {
  const { copy, path, language } = useArt();
  return <section className="art-custom-banner art-container"><div className="art-custom-banner__visual" aria-hidden="true"><div className="art-custom-banner__paper"><ArtVisual visual="custom" language={language} /></div><span className="art-custom-banner__scribble">just for you.</span></div><div><p className="art-eyebrow">{copy.customEyebrow}</p><h2>{copy.customTitle}</h2><p>{copy.customText}</p><Link className="art-button" to={path("/art/personnalisation")}>{copy.customAction}<ArrowRight size={18} /></Link></div></section>;
}

export function ArtHomePage() {
  const { copy, language, path } = useArt();
  const { works: artWorks, preview } = useArtCatalog();
  const hero = artWorks[0];
  return <ArtShell title={copy.heroNote} description={copy.heroBody}>
    <section className="art-hero art-container"><div className="art-hero__copy"><p className="art-eyebrow"><span />{copy.heroEyebrow}</p><h1>{copy.heroLine}<br /><em>{copy.heroAccent}</em></h1><p className="art-hero__body">{copy.heroBody}</p><div className="art-hero__actions"><Link className="art-button" to={path("/art/galerie")}>{copy.explore}<ArrowRight size={18} /></Link><a className="art-text-link" href="#collections">{copy.heroLink}<ArrowDown size={15} /></a></div><p className="art-hero__signature">{copy.heroNote}</p></div>
      <div className="art-hero__exhibit"><span className="art-hero__vertical" aria-hidden="true">L’ART A QUELQUE CHOSE À DIRE.</span><Link className="art-hero__picture" to={path(hero ? `/art/oeuvres/${hero.slug}` : "/art/galerie")}><div className="art-frame art-frame--hero"><ArtVisual visual={hero?.visual ?? "landscape"} image={hero?.images?.[0]} language={language} eager /></div><span className="art-hero__zoom"><Expand size={18} /><span className="art-sr-only">{copy.view}</span></span></Link><div className="art-hero__caption"><span className="art-hero__index">01 /</span><div><strong>{hero?.title[language] ?? "Creativa Poeta Art"}</strong><p>{hero?.sentence[language] ?? copy.heroCaptionText}</p></div>{(preview || !hero) && <span className="art-hero__study">{copy.specimen}</span>}</div></div>
    </section>
    <div className="art-principles art-container">{copy.principles.map((item, index) => <span key={item}><span aria-hidden="true">{["✳", "◈", "○"][index]}</span>{item}</span>)}</div>
    <section className="art-section art-container" id="collections"><SectionHeading eyebrow={copy.collectionEyebrow} title={copy.collectionTitle}>{copy.collectionIntro}</SectionHeading><CollectionCards /></section>
    <section className="art-section art-section--works"><div className="art-container"><div className="art-heading-row"><SectionHeading eyebrow={copy.selection} title={copy.worksTitle}>{preview ? copy.worksIntro : copy.catalogIntro}</SectionHeading><Link className="art-text-link" to={path("/art/galerie")}>{copy.allWorks}<ArrowRight size={17} /></Link></div><ArtCatalogStatus /><div className="art-work-grid">{artWorks.map(work => <WorkCard key={work.slug} work={work} />)}</div></div></section>
    <section className="art-manifesto art-container" id="notre-regard"><span className="art-manifesto__mark" aria-hidden="true">“</span><div><p className="art-eyebrow">{copy.manifestoEyebrow}</p><h2>{copy.manifestoTitle}</h2><p>{copy.manifestoText}</p><span className="art-manifesto__signature">{copy.manifestoLink}</span></div><span className="art-manifesto__symbol" aria-hidden="true">✳</span></section>
    <section className="art-materials art-container"><SectionHeading eyebrow={copy.materialEyebrow} title={copy.materialTitle} /><div className="art-material-grid">{artMaterials.map((material, index) => <div key={material.id}><span className={`art-material-swatch art-material-swatch--${material.id}`} aria-hidden="true"><span>cp.</span></span><span className="art-material-number">0{index + 1}</span><h3>{material.label[language]}</h3><p>{material.description[language]}</p></div>)}</div><p className="art-small-note">{copy.materialNote}</p></section>
    <MadeForYouBanner />{preview && <div className="art-presentation-note art-container"><strong>{copy.presentation}</strong><p>{copy.presentationNote}</p></div>}
  </ArtShell>;
}

function Gallery({ collection }: { collection?: ArtCollection }) {
  const { copy, language, path } = useArt();
  const { works: artWorks, preview } = useArtCatalog();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  useEffect(() => { setQuery(""); setSelected(""); }, [collection?.slug]);
  const visible = artWorks.filter(work => (!collection || work.collection === collection.slug) && (!selected || work.collection === selected) && `${work.title[language]} ${work.sentence[language]} ${artCollections.find(item => item.slug === work.collection)?.name}`.toLocaleLowerCase(language).includes(query.trim().toLocaleLowerCase(language)));
  const title = collection?.name ?? copy.gallery;
  return <ArtShell title={title} description={collection?.description[language] ?? (preview ? copy.worksIntro : copy.catalogIntro)}>
    <div className="art-container"><Breadcrumb current={title} /><section className="art-gallery-heading"><p className="art-eyebrow">{collection?.subtitle[language] ?? copy.selection}</p><h1>{title}<span className="art-title-dot">.</span></h1><p>{collection?.description[language] ?? (preview ? copy.worksIntro : copy.catalogIntro)}</p></section>
      <div className="art-filters"><label className="art-search"><Search size={19} /><span className="art-sr-only">{copy.searchLabel}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={copy.search} /></label>{!collection && <label className="art-filter-select"><span className="art-sr-only">{copy.collections}</span><select value={selected} onChange={event => setSelected(event.target.value)}><option value="">{copy.all}</option>{artCollections.filter(item => item.visual !== "custom").map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>}<p aria-live="polite">{visible.length} {preview ? copy.results : copy.resultCount}</p></div>
      <ArtCatalogStatus />{visible.length ? <div className="art-work-grid art-work-grid--gallery">{visible.map(work => <WorkCard work={work} key={work.slug} />)}</div> : !!artWorks.length && <div className="art-empty"><p>{copy.empty}</p><button type="button" className="art-text-link" onClick={() => { setQuery(""); setSelected(""); }}>{copy.clear}<ArrowRight size={17} /></button></div>}
      <p className="art-small-note art-gallery-note">{preview ? copy.presentationNote : copy.catalogIntro}</p><Link to={path("/art/collections")} className="art-text-link">{copy.collections}<ArrowRight size={17} /></Link>
    </div><MadeForYouBanner />
  </ArtShell>;
}

export function ArtGalleryPage() { return <Gallery />; }
export function ArtCollectionPage() {
  const { slug } = useParams();
  const collection = artCollections.find(item => item.slug === slug);
  if (!collection) return <ArtMissingPage />;
  if (collection.slug === "made-for-you") return <ArtCustomPage />;
  return <Gallery collection={collection} />;
}
export function ArtCollectionsPage() {
  const { copy } = useArt();
  return <ArtShell title={copy.collections} description={copy.collectionIntro}><div className="art-container"><Breadcrumb current={copy.collections} /><section className="art-gallery-heading"><p className="art-eyebrow">{copy.collectionEyebrow}</p><h1>{copy.collectionTitle}</h1><p>{copy.collectionIntro}</p></section><CollectionCards /><div className="art-collection-descriptions">{artCollections.map(item => <div key={item.slug}><span>{item.number}</span><div><h2>{item.name}</h2><CollectionDescription collection={item} /></div></div>)}</div></div></ArtShell>;
}
function CollectionDescription({ collection }: { collection: ArtCollection }) { const { language } = useArt(); return <p>{collection.description[language]}</p>; }
function Breadcrumb({ current }: { current: string }) { const { copy, path } = useArt(); return <nav className="art-breadcrumb" aria-label={copy.bread}><Link to={path("/art")}>CP Art</Link><ChevronRight size={12} /><span>{current}</span></nav>; }

export function ArtWorkPage() {
  const { slug } = useParams();
  const { works: artWorks, loading, error } = useArtCatalog();
  const { copy } = useArt();
  const work = artWorks.find(item => item.slug === slug);
  // A keyed detail component resets its visual and options when a related work opens.
  if (loading || error) return <ArtShell title={copy.gallery} description={copy.catalogIntro}><div className="art-container"><ArtCatalogStatus /></div></ArtShell>;
  return work ? (work.isDemo ? <ArtWorkDetail key={work.slug} work={work} /> : <ArtRealWorkDetail key={work.slug} work={work} />) : <ArtMissingPage />;
}
function ArtWorkDetail({ work }: { work: ArtWork }) {
  const { language, copy, path } = useArt();
  const { works: artWorks } = useArtCatalog();
  const [view, setView] = useState(0);
  const [material, setMaterial] = useState("canvas");
  const [format, setFormat] = useState(work.orientation === "landscape" ? "60 × 40 cm" : "40 × 50 cm");
  const dialog = useRef<HTMLDialogElement>(null);
  const zoomTrigger = useRef<HTMLButtonElement>(null);
  const collection = artCollections.find(item => item.slug === work.collection)!;
  const views = [copy.fullView, copy.imageDetail, copy.staging];
  const formats = work.orientation === "landscape" ? ["60 × 40 cm", "90 × 60 cm", "120 × 80 cm"] : ["40 × 50 cm", "60 × 75 cm", "80 × 100 cm"];
  const requestParams = new URLSearchParams({ inspiration: work.slug, support: material, format });
  return <ArtShell title={work.title[language]} description={work.sentence[language]}><div className="art-container"><Breadcrumb current={work.title[language]} />
    <div className="art-product"><section className="art-product__gallery" aria-label={copy.gallery}>
      <button className={`art-product__stage art-product__stage--${view} art-product__stage--${work.orientation}`} type="button" aria-label={`${copy.enlarge} — ${views[view]}`} ref={zoomTrigger} onClick={() => dialog.current?.showModal()}><div className="art-product__canvas"><ArtVisual visual={work.visual} title={work.title[language]} language={language} eager /></div><span className="art-product__expand"><Expand size={19} /></span></button>
      <div className="art-gallery-controls"><button className="art-icon-button" type="button" aria-label={copy.previous} onClick={() => setView((view + 2) % 3)}><ChevronLeft size={19} /></button><div className="art-gallery-tabs">{views.map((label, index) => <button key={label} type="button" aria-pressed={view === index} onClick={() => setView(index)}>{label}</button>)}</div><button className="art-icon-button" type="button" aria-label={copy.next} onClick={() => setView((view + 1) % 3)}><ChevronRight size={19} /></button></div>
      <p className="art-small-note">{view === 2 ? copy.stagingNote : copy.specimen}</p>
      <dialog className="art-lightbox" ref={dialog} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onClose={() => zoomTrigger.current?.focus()} aria-label={work.title[language]}><button className="art-lightbox__close" type="button" onClick={() => dialog.current?.close()} aria-label={copy.close}><X size={24} /></button><ArtVisual visual={work.visual} title={work.title[language]} language={language} /><p>{work.title[language]} · {copy.specimen}</p></dialog>
    </section><section className="art-product__information"><Link to={path(`/art/collections/${collection.slug}`)} className="art-eyebrow">{collection.name}</Link><h1>{work.title[language]}</h1><p className="art-product__sentence">{work.sentence[language]}</p><span className="art-study-badge">{copy.specimen}</span><div className="art-product__options"><h2>{copy.choose}</h2><p>{copy.chooseNote}</p><fieldset><legend>{copy.support}</legend><div className="art-option-buttons">{artMaterials.map(item => <button key={item.id} type="button" aria-pressed={material === item.id} onClick={() => setMaterial(item.id)}>{material === item.id && <Check size={13} />}{item.label[language]}</button>)}</div></fieldset><label className="art-format">{copy.format}<select value={format} onChange={event => setFormat(event.target.value)}>{formats.map(value => <option key={value}>{value}</option>)}</select></label><Link className="art-button" to={`${path("/art/personnalisation")}?${requestParams}`}>{copy.request}<ArrowRight size={18} /></Link><p className="art-small-note">{copy.noSale}</p></div></section></div>
    <section className="art-work-story"><div><p className="art-eyebrow">{copy.storyTitle}</p><h2>{work.title[language]}</h2><p>{work.story[language]}</p><span className="art-work-story__interpretation">{copy.interpretation}</span></div><div className="art-work-details"><h3>{copy.detailsTitle}</h3>{work.details.map((detail, index) => <div key={index}><span>0{index + 1}</span><div><h4>{detail.title[language]}</h4><p>{detail.text[language]}</p></div></div>)}</div></section>
    <section className="art-related"><div className="art-heading-row"><h2>{copy.related}</h2><Link className="art-text-link" to={path("/art/galerie")}>{copy.back}<ArrowRight size={16} /></Link></div><div className="art-work-grid art-work-grid--related">{artWorks.filter(item => item.slug !== work.slug).slice(0, 3).map(item => <WorkCard key={item.slug} work={item} />)}</div></section>
  </div></ArtShell>;
}

export function ArtCustomPage() {
  const { copy, language } = useArt();
  const { works: artWorks } = useArtCatalog();
  const [params] = useSearchParams();
  const inspiration = artWorks.find(work => work.slug === params.get("inspiration"));
  const selectedMaterial = artMaterials.find(material => material.id === params.get("support"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [material, setMaterial] = useState(selectedMaterial?.id ?? "canvas");
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !idea.trim()) { setError(true); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    setError(false); setReady(true);
  };
  const materialLabel = artMaterials.find(item => item.id === material)!.label[language];
  const body = `${copy.name}: ${name.trim()}\n${copy.email}: ${email.trim()}\n${copy.support}: ${materialLabel}\n${inspiration ? `${copy.inspiration}: ${inspiration.title[language]} (${copy.specimen})\n` : ""}${inspiration && params.get("format") ? `${copy.format}: ${params.get("format")}\n` : ""}\n${idea.trim()}`;
  return <ArtShell title="Made for You" description={copy.customText}><div className="art-container"><Breadcrumb current="Made for You" /><div className="art-custom-page"><section className="art-custom-page__intro"><p className="art-eyebrow">Made for You</p><h1>{copy.customTitle}</h1><p>{copy.customText}</p><div className="art-custom-steps">{[[copy.stepOne, copy.stepOneText], [copy.stepTwo, copy.stepTwoText], [copy.stepThree, copy.stepThreeText]].map(([title, text], index) => <div key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div></div>)}</div></section>
    <section className="art-custom-form">{ready ? <div className="art-email-ready"><Mail size={30} /><h2>{copy.ready}</h2><pre>{body}</pre><a className="art-button" href={`mailto:contact@creativapoeta.com?subject=${encodeURIComponent("Creativa Poeta Art — Made for You")}&body=${encodeURIComponent(body)}`}>{copy.openEmail}<ArrowRight size={17} /></a><button type="button" className="art-text-link" onClick={() => setReady(false)}><ArrowLeft size={15} />{copy.edit}</button></div> : <form onSubmit={submit} noValidate><h2>{copy.customFormTitle}</h2>{inspiration && <p className="art-form-inspiration">{copy.inspiration} : {inspiration.title[language]} · {copy.specimen}</p>}<label htmlFor="art-name">{copy.name}<input id="art-name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} maxLength={120} required /></label><label htmlFor="art-email">{copy.email}<input id="art-email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required /></label><label htmlFor="art-material">{copy.support}<select id="art-material" value={material} onChange={event => setMaterial(event.target.value as typeof material)}>{artMaterials.map(item => <option key={item.id} value={item.id}>{item.label[language]}</option>)}</select></label><label htmlFor="art-idea">{copy.idea}<textarea id="art-idea" rows={5} value={idea} onChange={event => setIdea(event.target.value)} placeholder={copy.ideaPlaceholder} maxLength={2500} required /></label>{error && <p className="art-form-error" role="alert" tabIndex={-1} ref={errorRef}>{copy.required}</p>}<button className="art-button" type="submit">{copy.prepare}<ArrowRight size={17} /></button><p className="art-small-note">{copy.emailNote}</p></form>}</section>
    </div></div></ArtShell>;
}

function ArtCatalogStatus() {
  const { copy } = useArt();
  const { loading, error, works, refresh } = useArtCatalog();
  if (!loading && !error && works.length) return null;
  return <div className="art-catalog-status" role={error ? "alert" : "status"}><p>{loading ? copy.loading : error ? copy.catalogueError : copy.catalogEmpty}</p>{error && <button type="button" className="art-text-link" onClick={refresh}>{copy.retry}</button>}</div>;
}

function ArtRealWorkDetail({ work }: { work: ArtWork }) {
  const { language, copy, path } = useArt();
  const { works } = useArtCatalog();
  const selection = useArtSelection();
  const navigate = useNavigate();
  const variants = work.variants ?? [];
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [photo, setPhoto] = useState(0);
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const zoom = useRef<HTMLButtonElement>(null);
  const variant = variants.find(item => item.id === variantId);
  const photos = work.images ?? [];
  const image = photos[photo];
  const collection = artCollections.find(item => item.slug === work.collection)!;
  const materials = artMaterials.filter(item => variants.some(variant => variant.material === item.id));
  const materialVariants = variants.filter(item => item.material === variant?.material);
  const add = () => {
    if (!work.id || !variant) return;
    if (!selection.add(work.id, variant.id)) { setError(copy.cartLimit); return; }
    navigate(path("/art/selection"));
  };
  return <ArtShell title={work.title[language]} description={work.sentence[language]}><div className="art-container"><Breadcrumb current={work.title[language]} />
    <div className="art-product"><section className="art-product__gallery" aria-label={copy.gallery}>
      <button ref={zoom} className={`art-product__stage art-product__stage--0 art-product__stage--${work.orientation}`} type="button" onClick={() => dialog.current?.showModal()} aria-label={copy.enlarge}><div className="art-product__canvas"><ArtVisual visual={work.visual} image={image} language={language} title={work.title[language]} eager /></div><span className="art-product__expand"><Expand size={19} /></span></button>
      {photos.length > 1 && <div className="art-photo-thumbnails">{photos.map((image, index) => <button key={`${image.url}-${index}`} type="button" onClick={() => setPhoto(index)} aria-label={`${copy.photo} ${index + 1}`} aria-pressed={index === photo}><img src={image.url} alt={image.alt[language]} /></button>)}</div>}
      <dialog ref={dialog} className="art-lightbox" aria-label={work.title[language]} onClose={() => zoom.current?.focus()} onClick={event => { if (event.currentTarget === event.target) dialog.current?.close(); }}><button type="button" className="art-lightbox__close" onClick={() => dialog.current?.close()} aria-label={copy.close}><X /></button><ArtVisual visual={work.visual} image={image} language={language} title={work.title[language]} /><p>{image?.alt[language] || work.title[language]}</p></dialog>
    </section><section className="art-product__information"><Link to={path(`/art/collections/${work.collection}`)} className="art-eyebrow">{collection.name}</Link><h1>{work.title[language]}</h1><p className="art-product__sentence">{work.sentence[language]}</p>{work.artist && <p className="art-small-note art-artist">{copy.artist} : {work.artist}</p>}
      <div className="art-product__options"><h2>{copy.choose}</h2>{!!variant && <p className="art-real-price">{artMoney(variant.priceCents, language)}</p>}
        <fieldset><legend>{copy.support}</legend><div className="art-option-buttons">{materials.map(item => <button key={item.id} type="button" aria-pressed={variant?.material === item.id} onClick={() => setVariantId(variants.find(variant => variant.material === item.id)!.id)}>{variant?.material === item.id && <Check size={13} />}{item.label[language]}</button>)}</div></fieldset>
        <label className="art-format">{copy.actualFormat}<select value={variantId} onChange={event => setVariantId(event.target.value)}>{materialVariants.map(item => <option value={item.id} key={item.id}>{item.format}</option>)}</select></label>
        {variant && <p className="art-small-note art-lead-time">{copy.preparation} : {variant.leadDaysMin}–{variant.leadDaysMax} {copy.days}.</p>}
        <button className="art-button" type="button" onClick={add} disabled={!variant}>{copy.add}<ShoppingBag size={17} /></button><p className="art-small-note">{copy.noPayment}</p>{error && <p role="alert" className="art-form-error">{error}</p>}
      </div></section></div>
      <section className="art-work-story"><div><p className="art-eyebrow">{copy.storyTitle}</p><h2>{work.title[language]}</h2><p>{work.story[language]}</p><span className="art-work-story__interpretation">{copy.interpretation}</span></div>{!!work.details.length && <div className="art-work-details"><h3>{copy.detailsTitle}</h3>{work.details.map((detail, index) => <div key={index}><span>0{index + 1}</span><div><h4>{detail.title[language]}</h4><p>{detail.text[language]}</p></div></div>)}</div>}</section>
      <section className="art-related"><div className="art-heading-row"><h2>{copy.related}</h2><Link className="art-text-link" to={path("/art/galerie")}>{copy.back}<ArrowRight size={16} /></Link></div><div className="art-work-grid art-work-grid--related">{works.filter(item => item.slug !== work.slug).slice(0, 3).map(item => <WorkCard key={item.slug} work={item} />)}</div></section>
    </div></ArtShell>;
}

export function ArtSelectionPage() {
  const { language, copy, path } = useArt();
  const { works, preview } = useArtCatalog();
  const { items, quantity, remove, clear } = useArtSelection();
  const [country, setCountry] = useState("BE");
  const [quote, setQuote] = useState<ArtQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [reference, setReference] = useState("");
  const requestKey = useRef<{ fingerprint: string; key: string } | null>(null);
  useEffect(() => {
    if (preview || !items.length) { setQuote(null); return; }
    let active = true;
    setQuote(null); setError(""); setLoading(true);
    fetchArtQuote(country, items).then(({ quote }) => { if (active) setQuote(quote); }).catch(error => { if (active) setError(error instanceof Error ? error.message : copy.catalogueError); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [country, items, preview, copy.catalogueError]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || !quote) return;
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !consent) { setFormError(copy.invalidForm); return; }
    setSending(true); setError(""); setFormError("");
    try {
      const payload = { country, items, name: name.trim(), email: email.trim(), message: message.trim(), locale: language, consent };
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(payload)));
      const fingerprint = Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
      if (!requestKey.current) { try { requestKey.current = JSON.parse(sessionStorage.getItem("cp_art_pending_request") || "null"); } catch { /* Session storage is optional. */ } }
      if (requestKey.current?.fingerprint !== fingerprint) requestKey.current = { fingerprint, key: crypto.randomUUID() };
      try { sessionStorage.setItem("cp_art_pending_request", JSON.stringify(requestKey.current)); } catch { /* The retry key remains in memory. */ }
      const result = await submitArtRequest({ ...payload, idempotencyKey: requestKey.current.key });
      setReference(result.reference); clear(); try { sessionStorage.removeItem("cp_art_pending_request"); } catch { /* No persistent session key to remove. */ }
    } catch (error) { setError(error instanceof Error ? error.message : copy.catalogueError); } finally { setSending(false); }
  };
  return <ArtShell title={copy.selectionTitle} description={copy.selectionIntro}><div className="art-container art-selection-page"><Breadcrumb current={copy.selectionTitle} /><div className="art-gallery-heading"><p className="art-eyebrow">CP Art</p><h1>{reference ? copy.requestReceived : copy.selectionTitle}</h1><p>{reference ? copy.requestNext : copy.selectionIntro}</p></div>
    {reference ? <div className="art-request-success" role="status"><Check size={28} /><p>{copy.reference} : <strong>{reference}</strong></p><p>{copy.noPayment}</p><Link className="art-button" to={path("/art/galerie")}>{copy.gallery}<ArrowRight size={17} /></Link></div> : preview || !items.length ? <div className="art-empty"><p>{preview ? copy.liveOnly : copy.emptySelection}</p><Link className="art-button" to={path("/art/galerie")}>{copy.gallery}<ArrowRight size={17} /></Link></div> : <div className="art-selection-layout"><section>
      <div className="art-selection-lines">{items.map(item => {
        const work = works.find(work => work.id === item.artworkId);
        const variant = work?.variants?.find(variant => variant.id === item.variantId);
        return <article key={`${item.artworkId}-${item.variantId}`} className="art-selection-line">{work?.images?.[0] && <img src={work.images[0].url} alt={work.images[0].alt[language]} />}<div><h2>{work?.title[language] || copy.unavailable}</h2><p>{variant ? `${artMaterials.find(material => material.id === variant.material)?.label[language]} · ${variant.format}` : copy.unavailable}</p><div className="art-selection-line__actions"><label>{copy.quantity}<input aria-label={`${copy.quantity} — ${work?.title[language] || item.artworkId}`} type="number" min={1} max={20} value={item.quantity} onChange={event => quantity(item.artworkId, item.variantId, Number(event.target.value))} disabled={sending} /></label><button type="button" className="art-text-link" onClick={() => remove(item.artworkId, item.variantId)} disabled={sending}>{copy.remove}</button></div></div>{variant && <strong>{artMoney(quote?.lines.find(line => line.artworkId === item.artworkId && line.variantId === item.variantId)?.lineTotalCents ?? variant.priceCents * item.quantity, language)}</strong>}</article>;
      })}</div>
      <label className="art-delivery-country">{copy.country}<select value={country} onChange={event => setCountry(event.target.value)} disabled={sending}>{ART_COUNTRIES.map(code => <option key={code} value={code}>{artCountryName(code, language)}</option>)}</select></label><p className="art-small-note">{copy.countryHelp}</p>
      {loading && <p role="status" className="art-catalog-status">{copy.loading}</p>}{quote && <div className="art-selection-total"><div><span>{copy.subtotal}</span><strong>{artMoney(quote.subtotalCents, language)}</strong></div><p>{copy.shippingPending}</p>{new Set(quote.lines.map(line => line.fulfillment)).size > 1 && <p>{copy.mixed}</p>}</div>}
    </section><section className="art-custom-form"><form onSubmit={submit} noValidate><h2>{copy.contactTitle}</h2><label>{copy.name}<input required autoComplete="name" maxLength={120} value={name} onChange={event => { setName(event.target.value); setFormError(""); }} disabled={sending} /></label><label>{copy.email}<input required autoComplete="email" type="email" maxLength={254} value={email} onChange={event => { setEmail(event.target.value); setFormError(""); }} disabled={sending} /></label><label>{copy.message}<textarea rows={3} maxLength={3000} value={message} onChange={event => setMessage(event.target.value)} disabled={sending} /></label><label className="art-consent"><input type="checkbox" checked={consent} onChange={event => { setConsent(event.target.checked); setFormError(""); }} disabled={sending} required /><span>{copy.consent}</span></label>{(error || formError) && <p className="art-form-error" role="alert">{error || formError}</p>}<button className="art-button" type="submit" disabled={!quote || loading || sending}>{sending ? copy.sending : copy.selectionRequest}<ArrowRight size={17} /></button><p className="art-small-note">{copy.noPayment}</p></form></section></div>}
  </div></ArtShell>;
}

function ArtMissingPage() { const { copy, path } = useArt(); return <ArtShell title={copy.invalidTitle} description={copy.invalidText}><div className="art-container art-missing"><h1>{copy.invalidTitle}</h1><p>{copy.invalidText}</p><Link className="art-button" to={path("/art/collections")}>{copy.collections}<ArrowRight size={18} /></Link></div></ArtShell>; }
