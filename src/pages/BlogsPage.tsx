import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogLanguage, BlogPost, fetchBlogs } from "../APIs/Blogs";
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
    title: "Conseils pour une présence qui travaille vraiment.",
    intro:
      "Visibilité, création, outils digitaux, IA et assistance numérique: des réponses pratiques pour passer à l'action.",
    seoTitle: "Conseils visibilité, design et outils digitaux | Creativa Poeta",
    seoDescription:
      "Guides pratiques de Creativa Poeta sur la visibilité locale, le design, les sites, applications, contenus, IA et outils numériques.",
    search: "Rechercher un sujet",
    all: "Tous",
    read: "Lire l'article",
    empty: "Aucun article ne correspond a cette recherche.",
    loading: "Chargement des articles...",
    previous: "Precedent",
    next: "Suivant",
    unknown: "Équipe Creativa Poeta",
  },
  en: {
    title: "Advice for a digital presence that delivers.",
    intro:
      "Visibility, creation, digital tools, AI and technology support: practical answers built for action.",
    seoTitle: "Visibility, design and digital tools advice | Creativa Poeta",
    seoDescription:
      "Practical Creativa Poeta guides about local visibility, design, websites, applications, content, AI and digital tools.",
    search: "Search a topic",
    all: "All",
    read: "Read article",
    empty: "No article matches this search.",
    loading: "Loading articles...",
    previous: "Previous",
    next: "Next",
    unknown: "Creativa Poeta team",
  },
  nl: {
    title: "Advies voor een digitale aanwezigheid die werkt.",
    intro:
      "Zichtbaarheid, creatie, digitale tools, AI en technische hulp: praktische antwoorden om actie te ondernemen.",
    seoTitle: "Advies over zichtbaarheid, design en digitale tools | Creativa Poeta",
    seoDescription:
      "Praktische gidsen van Creativa Poeta over lokale zichtbaarheid, design, websites, apps, content, AI en digitale tools.",
    search: "Zoek een onderwerp",
    all: "Alles",
    read: "Lees artikel",
    empty: "Geen artikel past bij deze zoekopdracht.",
    loading: "Artikelen laden...",
    previous: "Vorige",
    next: "Volgende",
    unknown: "Creativa Poeta team",
  },
  kiny: {
    title: "Inama zituma presence yawe ikora neza.",
    intro:
      "Visibility, creation, digital tools, AI n'ubufasha bwa tekiniki: ibisubizo bifatika byo gutangira gukora.",
    seoTitle: "Inama kuri visibility, design na digital tools | Creativa Poeta",
    seoDescription:
      "Guides za Creativa Poeta kuri local visibility, design, websites, applications, content, AI na digital tools.",
    search: "Shakisha topic",
    all: "Byose",
    read: "Soma article",
    empty: "Nta article ihuye n'ibyo ushaka.",
    loading: "Articles zirimo kuza...",
    previous: "Inyuma",
    next: "Imbere",
    unknown: "Équipe Creativa Poeta",
  },
} satisfies Record<LocaleKey, Record<string, string>>;

const dateLocales: Record<LocaleKey, string> = {
  fr: "fr-BE",
  en: "en-GB",
  nl: "nl-BE",
  kiny: "rw-RW",
};

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/s+/g, " ").trim();

const articlePath = (blog: BlogPost) =>
  localizePath(`/blogs/${blog.slug || blog._id}`);

const BlogsPage = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const copy = copyByLocale[locale] ?? copyByLocale.fr;
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchBlogs({
      language: locale,
      category: category || undefined,
      search: search || undefined,
      page,
      limit: 12,
    })
      .then((data) => {
        if (!active) return;
        const items = Array.isArray(data.blogs) ? data.blogs : [];
        setBlogs(items);
        setCategories(
          Array.isArray(data.categories)
            ? data.categories
            : Array.from(
                new Set(items.map((blog) => blog.category).filter(Boolean))
              ) as string[]
        );
        setPages(data.pagination?.pages || 1);
      })
      .catch(() => {
        if (active) {
          setBlogs([]);
          setCategories([]);
          setPages(1);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [category, locale, page, search]);

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: copy.seoTitle,
      description: copy.seoDescription,
      blogPost: blogs.slice(0, 10).map((blog) => ({
        "@type": "BlogPosting",
        headline: blog.title,
        datePublished: blog.publishedAt || blog.createdAt,
        inLanguage: blog.language || locale,
      })),
    }),
    [blogs, copy, locale]
  );

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    setPage(1);
    setSearch(query.trim());
  };

  const selectCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <PageLayout className="min-h-screen bg-[#071a33] text-white">
      <MarketSEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        keywords="visibilité locale, design graphique, outils digitaux, intelligence artificielle, assistance numérique"
        path="/blogs"
        structuredData={structuredData}
      />

      <main className="min-h-screen px-4 pb-16 pt-24 phone:px-6 laptop:pt-32">
        <div className="mx-auto max-w-7xl">
          <header className="border-b border-white/15 pb-6 laptop:grid laptop:grid-cols-[1fr_28rem] laptop:items-end laptop:gap-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#EEBA2B]">
                Journal Creativa Poeta
              </p>
              <h1 className="mt-3 max-w-3xl font-['Black_Ops_One'] text-3xl leading-tight phone:text-4xl laptop:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-white/65">
                {copy.intro}
              </p>
            </div>

            <form onSubmit={submitSearch} className="relative mt-5 laptop:mt-0">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.search}
                aria-label={copy.search}
                className="h-12 w-full rounded-full border border-white/20 bg-white/[.07] pl-5 pr-12 text-sm font-bold text-white outline-none placeholder:text-white/40 focus:border-[#fff200]"
              />
              <button
                type="submit"
                aria-label={copy.search}
                className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff200] text-[#071a33]"
              >
                <Search size={17} />
              </button>
            </form>
          </header>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Categories">
            <button
              type="button"
              onClick={() => selectCategory("")}
              className={`flex-none rounded-full border px-4 py-2 text-xs font-black ${
                category === ""
                  ? "border-[#fff200] bg-[#fff200] text-[#071a33]"
                  : "border-white/20 bg-white/[.06] text-white"
              }`}
            >
              {copy.all}
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectCategory(item)}
                className={`flex-none rounded-full border px-4 py-2 text-xs font-black ${
                  category === item
                    ? "border-[#fff200] bg-[#fff200] text-[#071a33]"
                    : "border-white/20 bg-white/[.06] text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {loading ? (
            <div className="flex min-h-[18rem] items-center justify-center text-sm font-black text-white/55">
              {copy.loading}
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex min-h-[18rem] items-center justify-center border-b border-white/10 text-center text-sm font-bold text-white/55">
              {copy.empty}
            </div>
          ) : (
            <section className="mt-5 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
              {blogs.map((blog) => {
                const excerpt =
                  blog.excerpt ||
                  `${stripHtml(blog.content).slice(0, 180)}...`;
                return (
                  <article
                    key={blog._id}
                    className="overflow-hidden rounded-lg border border-white/15 bg-white/[.06]"
                  >
                    <Link to={articlePath(blog)} className="block">
                      <div className="aspect-[16/9] overflow-hidden bg-black/30">
                        <img
                          src={blog.image || "/consult.jpeg"}
                          alt={blog.imageAlt || blog.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase text-white/50">
                        <span className="inline-flex items-center gap-1 text-[#EEBA2B]">
                          <Tag size={12} />
                          {blog.category || "Conseils"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={12} />
                          {new Date(
                            blog.publishedAt || blog.createdAt
                          ).toLocaleDateString(dateLocales[locale], {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h2 className="mt-3 text-xl font-black leading-6 text-white">
                        <Link to={articlePath(blog)}>{blog.title}</Link>
                      </h2>
                      <p className="mt-2 line-clamp-3 text-xs font-bold leading-5 text-white/60">
                        {excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                        <span className="whitespace-nowrap text-[10px] font-bold text-white/45">
                          {blog.author?.name || copy.unknown}
                        </span>
                        <Link
                          to={articlePath(blog)}
                          className="inline-flex items-center gap-2 text-xs font-black text-[#fff200]"
                        >
                          {copy.read}
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}

          {pages > 1 && (
            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="rounded-full border border-white/30 py-3 text-xs font-black uppercase disabled:opacity-25"
              >
                {copy.previous}
              </button>
              <button
                type="button"
                disabled={page >= pages}
                onClick={() => setPage((current) => Math.min(pages, current + 1))}
                className="rounded-full bg-[#fff200] py-3 text-xs font-black uppercase text-[#071a33] disabled:opacity-25"
              >
                {copy.next}
              </button>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default BlogsPage;