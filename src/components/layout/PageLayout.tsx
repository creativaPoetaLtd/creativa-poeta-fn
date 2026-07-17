import type { ReactNode } from "react";
import BrandHomeLink from "../NavBars/BrandHomeLink";
import NavBar from "../NavBars/NavBar";
import Footer from "../sections/Footer";
import MainFooter from "../sections/MainFooter";

type PageLayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
};

const PageLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  className = "",
}: PageLayoutProps) => {
  return (
    <div className={`App w-full max-w-full overflow-x-hidden flex flex-col snap-x scroll-smooth ${className}`}>
      {showHeader ? (
        <header className="pointer-events-none absolute left-0 top-0 z-40 w-full">
          <BrandHomeLink />
          <NavBar />
        </header>
      ) : null}
      {children}
      {showFooter ? (
        <div className="w-full flex flex-col scroll-smooth snap-x">
          <Footer />
          <MainFooter />
        </div>
      ) : null}
    </div>
  );
};

export default PageLayout;

