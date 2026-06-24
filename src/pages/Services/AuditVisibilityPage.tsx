import AuditVisibility from "../../components/Services/AuditVisibility";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const AuditVisibilityPage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.auditVisibility}
        path="/services/audit-visibilite"
      />
      <AuditVisibility />
    </PageLayout>
  );
};

export default AuditVisibilityPage;
