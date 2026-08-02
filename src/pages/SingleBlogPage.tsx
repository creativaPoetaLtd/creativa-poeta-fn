import { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  BlogLanguage,
  BlogPost,
  RelatedBlogPost,
  fetchSingleBlog,
} from "../APIs/Blogs";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import PageLayout from "../components/layout/PageLayout";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../data/marketRuntime";

type LocaleKey = BlogLanguage;

const copyByLocale = {
  fr: {
    back: "Tous les articles",
    loading: "Chargement de l'article...",
    missing: "Cet article n'est pas disponible.",
    by: "Par",
    disclosure:
      "Cet article peut contenir des liens affilies. Creativa Poeta peut recevoir une commission sans cout supplementaire pour vous.",
    useful: "Besoin d’une aide adaptée à votre situation ?",
    visibility: "Tester ma visibilité",
    project: "Démarrer un projet",
    updated: "Mis à jour",
    related: "A lire aussi",
  },
  en: {
    back: "All articles",
    loading: "Loading article...",
    missing: "This article is not available.",
    by: "By",
    disclosure:
      "This article may contain affiliate links. Creativa Poeta may receive a commission at no additional cost to you.",
    useful: "Need help tailored to your situation?",
    visibility: "Test my visibility",
    project: "Start a project",
    updated: "Updated",
    related: "Related articles",
  },
  nl: {
    back: "Alle artikelen",
    loading: "Artikel laden...",
    missing: "Dit artikel is niet beschikbaar.",
    by: "Door",
    disclosure:
      "Dit artikel kan affiliatelinks bevatten. Creativa Poeta kan een commissie ontvangen zonder extra kosten voor jou.",
    useful: "Hulp nodig die bij jouw situatie past?",
    visibility: "Test mijn zichtbaarheid",
    project: "Start een project",
    updated: "Bijgewerkt",
    related: "Lees ook",
  },
  kiny: {
    back: "Articles zose",
    loading: "Article irimo kuza...",
    missing: "Iyi article ntiboneka.",
    by: "Yanditswe na",
    disclosure:
      "Iyi article ishobora kugira affiliate links. Creativa Poeta ishobora guhabwa commission nta kindi wishyuye.",
    useful: "Ukeneye ubufasha bujyanye n'ikibazo cyawe?",
    visibility: "Gupima visibility",
    project: "Tangira project",
    updated: "Yavuguruwe",
    related: "Soma kandi",
  },
} satisfies Record<LocaleKey, Record<string, string>>;

const dateLocales: Record<LocaleKey, string> = {
  fr: "fr-BE",
  en: "en-GB",
  nl: "nl-BE",
  kiny: "rw-RW",
};

const SingleBlogPage = () => {
  const { slug = "" } = useParams();
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const copy = copyByLocale[locale] ?? copyByLocale.fr;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [translations, setTranslations] = useState<
    Array<Pick<BlogPost, "title" | "slug" | "language">>
  >([]);
  const [relatedArticles, setRelatedArticles] = useState<RelatedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchSingleBlog(slug, locale)
      .then((data) => {
        if (!active) return;
        setBlog(data.blog);
        setTranslations(data.translations || []);
        setRelatedArticles(data.relatedArticles || []);
      })
      .catch(() => {
        if (active) setBlog(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [locale, slug]);

  const structuredData = useMemo(() => {
    if (!blog) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.seoDescription || blog.excerpt,
      image: blog.image ? [blog.image] : undefined,
      datePublished: blog.publishedAt || blog.createdAt,
      dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
      inLanguage: blog.language || locale,
      articleSection: blog.category,
      keywords: blog.tags?.join(", "),
      author: {
        "@type": "Person",
        name: blog.author?.name || "Creativa Poeta",
      },
      publisher: {
        "@type": "Organization",
        name: "Creativa Poeta",
      },
      isRelatedTo: relatedArticles.map((article) => ({
        "@type": "BlogPosting",
        headline: article.title,
        url: localizePath(`/blogs/${article.slug || article._id}`),
      })),
    };
  }, [blog, locale, relatedArticles]);

  if (loading) {
    return (
      <PageLayout className="min-h-screen bg-[#071a33] text-white">
        <main className="flex min-h-[70vh] items-center justify-center px-5 pt-24 text-sm font-black text-white/55">
          {copy.loading}
        </main>
      </PageLayout>
    );
  }

  if (!blog) {
    return (
      <PageLayout className="min-h-screen bg-[#071a33] text-white">
        <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-5 pt-24 text-center">
          <h1 className="text-2xl font-black">{copy.missing}</h1>
          <Link
            to={localizePath("/blogs")}
            className="rounded-full bg-[#fff200] px-5 py-3 text-xs font-black uppercase text-[#071a33]"
          >
            {copy.back}
          </Link>
        </main>
      </PageLayout>
    );
  }

  const publishedDate = new Date(
    blog.publishedAt || blog.createdAt
  ).toLocaleDateString(dateLocales[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const updatedDate = blog.updatedAt
    ? new Date(blog.updatedAt).toLocaleDateString(dateLocales[locale], {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <PageLayout className="min-h-screen bg-[#071a33] text-white">
      <MarketSEOHead
        title={blog.seoTitle || blog.title}
        description={
          blog.seoDescription ||
          blog.excerpt ||
          blog.title
        }
        keywords={[blog.focusKeyword, ...(blog.tags || [])]
          .filter(Boolean)
          .join(", ")}
        path={`/blogs/${blog.slug || blog._id}`}
        structuredData={structuredData}
      />

      <main className="pb-16 pt-24 laptop:pt-32">
        <article>
          <header className="mx-auto max-w-5xl px-4 phone:px-6">
            <Link
              to={localizePath("/blogs")}
              className="inline-flex items-center gap-2 text-xs font-black uppercase text-white/60 hover:text-[#fff200]"
            >
              <ArrowLeft size={15} />
              {copy.back}
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase">
              <span className="rounded-full bg-[#EEBA2B] px-3 py-1.5 text-[#071a33]">
                {blog.category || "Conseils"}
              </span>
              {(blog.tags || []).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-4 max-w-4xl font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-4xl laptop:text-6xl">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="mt-4 max-w-3xl text-sm font-bold leading-6 text-white/65 phone:text-base">
                {blog.excerpt}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 py-4 text-[11px] font-bold text-white/55">
              <span className="inline-flex items-center gap-2">
                <User size={14} />
                {copy.by} {blog.author?.name || "Creativa Poeta"}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={14} />
                {publishedDate}
              </span>
              {updatedDate && (
                <span>
                  {copy.updated}: {updatedDate}
                </span>
              )}
            </div>
          </header>

          {blog.image && (
            <figure className="mx-auto max-w-6xl px-0 phone:px-6">
              <div className="aspect-[16/9] max-h-[38rem] overflow-hidden bg-black">
                <img
                  src={blog.image}
                  alt={blog.imageAlt || blog.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          )}

          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-7 phone:px-6 laptop:grid-cols-[minmax(0,1fr)_18rem] laptop:py-10">
            <div>
              {blog.affiliateDisclosure && (
                <p className="mb-6 border-l-4 border-[#EEBA2B] bg-white/[.06] px-4 py-3 text-[11px] font-bold leading-5 text-white/60">
                  {copy.disclosure}
                </p>
              )}

              <div className="blog-content max-w-none text-sm font-medium leading-7 text-white/80 [&_a]:font-bold [&_a]:text-[#fff200] [&_blockquote]:border-l-4 [&_blockquote]:border-[#EEBA2B] [&_blockquote]:pl-4 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-white [&_img]:my-6 [&_img]:w-full [&_li]:mb-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_strong]:text-white [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
                {parse(blog.content)}
              </div>
            </div>

            <aside className="border-t border-white/15 pt-6 laptop:border-l laptop:border-t-0 laptop:pl-6 laptop:pt-0">
              <p className="text-sm font-black text-[#fff200]">{copy.useful}</p>

              {blog.cta?.url && blog.cta?.label ? (
                blog.cta.url.startsWith("/") ? (
                  <Link
                    to={localizePath(blog.cta.url)}
                    className="mt-4 inline-flex w-full items-center justify-between rounded-full bg-[#fff200] px-4 py-3 text-xs font-black uppercase text-[#071a33]"
                  >
                    {blog.cta.label}
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <a
                    href={blog.cta.url}
                    target="_blank"
                    rel={
                      blog.cta.type === "affiliate"
                        ? "sponsored noopener noreferrer"
                        : "noopener noreferrer"
                    }
                    className="mt-4 inline-flex w-full items-center justify-between rounded-full bg-[#fff200] px-4 py-3 text-xs font-black uppercase text-[#071a33]"
                  >
                    {blog.cta.label}
                    <ExternalLink size={15} />
                  </a>
                )
              ) : (
                <div className="mt-4 grid gap-2">
                  <Link
                    to={localizePath("/tester-visibilite")}
                    className="rounded-full bg-[#fff200] px-4 py-3 text-center text-xs font-black uppercase text-[#071a33]"
                  >
                    {copy.visibility}
                  </Link>
                  <Link
                    to={localizePath("/start-project")}
                    className="rounded-full border border-white/35 px-4 py-3 text-center text-xs font-black uppercase text-white"
                  >
                    {copy.project}
                  </Link>
                </div>
              )}

              {translations.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {translations.map((translation) => (
                    <Link
                      key={`${translation.language}-${translation.slug}`}
                      to={localizePath(
                        `/blogs/${translation.slug}`,
                        market,
                        translation.language
                      )}
                      className="rounded-full border border-white/20 px-3 py-2 text-[10px] font-black uppercase text-white/60"
                    >
                      {translation.language}
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>

          {relatedArticles.length > 0 && (
            <section className="mx-auto max-w-6xl border-t border-white/15 px-4 py-8 phone:px-6 laptop:py-12">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-xl font-black text-white phone:text-2xl">{copy.related}</h2>
                <Link to={localizePath("/blogs")} className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#fff200]">
                  {copy.back}<ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid gap-3 phone:grid-cols-2 laptop:grid-cols-3">
                {relatedArticles.map((article) => (
                  <Link key={article._id} to={localizePath(`/blogs/${article.slug || article._id}`)} className="group grid min-h-28 grid-cols-[5.5rem_1fr] overflow-hidden border border-white/15 bg-white/[.05] transition hover:border-[#EEBA2B] phone:block">
                    {article.image ? (
                      <img src={article.image} alt={article.imageAlt || article.title} loading="lazy" className="h-full min-h-28 w-full object-cover phone:aspect-[16/8] phone:min-h-0" />
                    ) : (
                      <div className="h-full min-h-28 bg-[#102640] phone:aspect-[16/8] phone:min-h-0" />
                    )}
                    <div className="flex min-w-0 flex-col justify-center p-3 phone:p-4">
                      <span className="text-[9px] font-black uppercase text-[#EEBA2B]">{article.category || "Conseils"}</span>
                      <h3 className="mt-1 line-clamp-3 text-sm font-black leading-5 text-white group-hover:text-[#fff200]">{article.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </PageLayout>
  );
};

export default SingleBlogPage;