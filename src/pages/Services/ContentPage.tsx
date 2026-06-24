
import ContentWritting from "../../components/Services/Content";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const ContentPage = () => {
    return (
        <PageLayout>
            <MarketSEOHead
                {...seoConfig.services.contentWriting}
                path="/services/content-writing"
            />
            <ContentWritting/>
        </PageLayout>
    )
}

export default ContentPage;
