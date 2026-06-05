import SEOHead from "./SEOHead";
import {
  getCanonicalUrl,
  getCurrentLocale,
  getCurrentMarket,
  getMarketAlternateLinks,
  getPathWithoutLocale,
} from "../../data/marketRuntime";

type MarketSEOHeadProps = {
  title: string;
  description: string;
  keywords?: string;
  structuredData?: object;
  path?: string;
};

function withUrl(structuredData: object | undefined, url: string) {
  if (!structuredData) return undefined;
  return {
    ...structuredData,
    url,
  };
}

const MarketSEOHead = ({
  title,
  description,
  keywords,
  structuredData,
  path,
}: MarketSEOHeadProps) => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const currentPath =
    path ??
    (typeof window === "undefined"
      ? "/"
      : getPathWithoutLocale(window.location.pathname));
  const url = getCanonicalUrl(market, locale, currentPath);

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={keywords}
      url={url}
      alternates={getMarketAlternateLinks(market, currentPath)}
      structuredData={withUrl(structuredData, url)}
    />
  );
};

export default MarketSEOHead;
