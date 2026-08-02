import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import TermsPage from "./pages/TermsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ScrollToTop from "./ScrollToTop.tsx";
import ProjectFormPage from "./pages/ProjectFormPage.tsx";
import JobsPages from "./pages/JobsPages.tsx";
import LeaveInfoPage from "./pages/LeaveInfoPage.tsx";
import ThankYouPage from "./pages/ThankYouPage.tsx";
import WebPage from "./pages/Services/WebAppPage.tsx";
import ContentPage from "./pages/Services/ContentPage.tsx";
import GetBackToYou from "./components/getBackToYou.tsx";
import GraphicDesignPage from "./pages/Services/GraphicDesignPage.tsx";
import AuditVisibilityPage from "./pages/Services/AuditVisibilityPage.tsx";
import OfficialWebsitePage from "./pages/Services/OfficialWebsitePage.tsx";
import LocalVisibilityPage from "./pages/Services/LocalVisibilityPage.tsx";
import UsefulContentPage from "./pages/Services/UsefulContentPage.tsx";
import AIAutomationPage from "./pages/Services/AIAutomationPage.tsx";
import DigitalAssistancePage from "./pages/Services/DigitalAssistancePage.tsx";
import Dashboard from "./Dashboard/Dashboard.tsx";
import BlogsPage from "./pages/BlogsPage.tsx";
import SingleBlogPage from "./pages/SingleBlogPage.tsx";
import Login from "./components/Login.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import VisibilityAuditToolPage from "./pages/VisibilityAuditToolPage.tsx";
import DigitalAssistanceRequestPage from "./pages/DigitalAssistanceRequestPage.tsx";
import KnowledgePage from "./pages/KnowledgePage.tsx";
import AnswersPage from "./pages/AnswersPage.tsx";
import PartnershipPage from "./pages/PartnershipPage.tsx";
import CookieConsent from "./components/cookies/CookieConsent.tsx";

const appElement = (
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/en" element={<App />} />
            <Route path="/fr" element={<App />} />
            <Route path="/nl" element={<App />} />
            <Route path="/rw" element={<App />} />
            <Route path="/refonte" element={<Navigate to="/" replace />} />
            <Route path="/mentions-legales" element={<TermsPage />} />
            <Route path="/en/mentions-legales" element={<TermsPage />} />
            <Route path="/fr/mentions-legales" element={<TermsPage />} />
            <Route path="/nl/mentions-legales" element={<TermsPage />} />
            <Route path="/rw/mentions-legales" element={<TermsPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/en/terms-and-conditions" element={<TermsPage />} />
            <Route path="/fr/terms-and-conditions" element={<TermsPage />} />
            <Route path="/nl/terms-and-conditions" element={<TermsPage />} />
            <Route path="/rw/terms-and-conditions" element={<TermsPage />} />
            <Route path="/confidentialite-cookies" element={<TermsPage />} />
            <Route path="/en/confidentialite-cookies" element={<TermsPage />} />
            <Route path="/fr/confidentialite-cookies" element={<TermsPage />} />
            <Route path="/nl/confidentialite-cookies" element={<TermsPage />} />
            <Route path="/rw/confidentialite-cookies" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            <Route path="/fr/contact" element={<ContactPage />} />
            <Route path="/nl/contact" element={<ContactPage />} />
            <Route path="/rw/contact" element={<ContactPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="/en/partnership" element={<PartnershipPage />} />
            <Route path="/fr/partnership" element={<PartnershipPage />} />
            <Route path="/nl/partnership" element={<PartnershipPage />} />
            <Route path="/rw/partnership" element={<PartnershipPage />} />
            {/* <Route path="/career" element={<JobsPages />} /> */}
            <Route path="/start-project" element={<ProjectFormPage />} />
            <Route path="/en/start-project" element={<ProjectFormPage />} />
            <Route path="/fr/start-project" element={<ProjectFormPage />} />
            <Route path="/nl/start-project" element={<ProjectFormPage />} />
            <Route path="/rw/start-project" element={<ProjectFormPage />} />
            <Route path="/tester-visibilite" element={<VisibilityAuditToolPage />} />
            <Route path="/en/tester-visibilite" element={<VisibilityAuditToolPage />} />
            <Route path="/fr/tester-visibilite" element={<VisibilityAuditToolPage />} />
            <Route path="/nl/tester-visibilite" element={<VisibilityAuditToolPage />} />
            <Route path="/rw/tester-visibilite" element={<VisibilityAuditToolPage />} />
            <Route path="/demander-assistance-numerique" element={<DigitalAssistanceRequestPage />} />
            <Route path="/en/demander-assistance-numerique" element={<DigitalAssistanceRequestPage />} />
            <Route path="/fr/demander-assistance-numerique" element={<DigitalAssistanceRequestPage />} />
            <Route path="/nl/demander-assistance-numerique" element={<DigitalAssistanceRequestPage />} />
            <Route path="/rw/demander-assistance-numerique" element={<DigitalAssistanceRequestPage />} />
            <Route path="/form-to-leave-info" element={<LeaveInfoPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/thank-you-for-applying" element={<GetBackToYou />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/en/blogs" element={<BlogsPage />} />
            <Route path="/fr/blogs" element={<BlogsPage />} />
            <Route path="/nl/blogs" element={<BlogsPage />} />
            <Route path="/rw/blogs" element={<BlogsPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/en/knowledge" element={<KnowledgePage />} />
            <Route path="/fr/knowledge" element={<KnowledgePage />} />
            <Route path="/nl/knowledge" element={<KnowledgePage />} />
            <Route path="/rw/knowledge" element={<KnowledgePage />} />
            <Route path="/answers" element={<AnswersPage />} />
            <Route path="/en/answers" element={<AnswersPage />} />
            <Route path="/fr/answers" element={<AnswersPage />} />
            <Route path="/nl/answers" element={<AnswersPage />} />
            <Route path="/rw/answers" element={<AnswersPage />} />
            <Route path="/blogs/:slug" element={<SingleBlogPage />} />
            <Route path="/en/blogs/:slug" element={<SingleBlogPage />} />
            <Route path="/fr/blogs/:slug" element={<SingleBlogPage />} />
            <Route path="/nl/blogs/:slug" element={<SingleBlogPage />} />
            <Route path="/rw/blogs/:slug" element={<SingleBlogPage />} />
            {/* <Route path="/register" element={<Signup />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}

            {/* Admin-only secure routes with authentication protection */}
            <Route
              path="/secure-admin-careers-panel-2024"
              element={
                <ProtectedRoute>
                  <JobsPages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secure-admin-blogs-management-2024"
              element={
                <ProtectedRoute>
                  <BlogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secure-admin-blogs-management-2024/:id"
              element={
                <ProtectedRoute>
                  <SingleBlogPage />
                </ProtectedRoute>
              }
            />
            <Route path="/secure-admin-login-2024" element={<Login />} />

            {/* Valid servicessss */}
            <Route path="/services/audit-visibilite" element={<AuditVisibilityPage />} />
            <Route path="/en/services/audit-visibilite" element={<AuditVisibilityPage />} />
            <Route path="/fr/services/audit-visibilite" element={<AuditVisibilityPage />} />
            <Route path="/nl/services/audit-visibilite" element={<AuditVisibilityPage />} />
            <Route path="/rw/services/audit-visibilite" element={<AuditVisibilityPage />} />
            <Route path="/services/site-officiel" element={<OfficialWebsitePage />} />
            <Route path="/en/services/site-officiel" element={<OfficialWebsitePage />} />
            <Route path="/fr/services/site-officiel" element={<OfficialWebsitePage />} />
            <Route path="/nl/services/site-officiel" element={<OfficialWebsitePage />} />
            <Route path="/rw/services/site-officiel" element={<OfficialWebsitePage />} />
            <Route path="/services/visibilite-locale" element={<LocalVisibilityPage />} />
            <Route path="/en/services/visibilite-locale" element={<LocalVisibilityPage />} />
            <Route path="/fr/services/visibilite-locale" element={<LocalVisibilityPage />} />
            <Route path="/nl/services/visibilite-locale" element={<LocalVisibilityPage />} />
            <Route path="/rw/services/visibilite-locale" element={<LocalVisibilityPage />} />
            <Route path="/services/contenus-utiles" element={<UsefulContentPage />} />
            <Route path="/en/services/contenus-utiles" element={<UsefulContentPage />} />
            <Route path="/fr/services/contenus-utiles" element={<UsefulContentPage />} />
            <Route path="/nl/services/contenus-utiles" element={<UsefulContentPage />} />
            <Route path="/rw/services/contenus-utiles" element={<UsefulContentPage />} />
            <Route path="/services/ia-automatisation" element={<AIAutomationPage />} />
            <Route path="/en/services/ia-automatisation" element={<AIAutomationPage />} />
            <Route path="/fr/services/ia-automatisation" element={<AIAutomationPage />} />
            <Route path="/nl/services/ia-automatisation" element={<AIAutomationPage />} />
            <Route path="/rw/services/ia-automatisation" element={<AIAutomationPage />} />
            <Route path="/services/assistance-numerique" element={<DigitalAssistancePage />} />
            <Route path="/en/services/assistance-numerique" element={<DigitalAssistancePage />} />
            <Route path="/fr/services/assistance-numerique" element={<DigitalAssistancePage />} />
            <Route path="/nl/services/assistance-numerique" element={<DigitalAssistancePage />} />
            <Route path="/rw/services/assistance-numerique" element={<DigitalAssistancePage />} />
            <Route path="/services/web-app" element={<WebPage />} />
            <Route path="/en/services/web-app" element={<WebPage />} />
            <Route path="/fr/services/web-app" element={<WebPage />} />
            <Route path="/nl/services/web-app" element={<WebPage />} />
            <Route path="/rw/services/web-app" element={<WebPage />} />
            <Route path="/services/content-writing" element={<ContentPage />} />
            <Route path="/en/services/content-writing" element={<ContentPage />} />
            <Route path="/fr/services/content-writing" element={<ContentPage />} />
            <Route path="/nl/services/content-writing" element={<ContentPage />} />
            <Route path="/rw/services/content-writing" element={<ContentPage />} />
            <Route
              path="/services/graphic-design"
              element={<GraphicDesignPage />}
            />
            <Route
              path="/en/services/graphic-design"
              element={<GraphicDesignPage />}
            />
            <Route
              path="/fr/services/graphic-design"
              element={<GraphicDesignPage />}
            />
            <Route
              path="/nl/services/graphic-design"
              element={<GraphicDesignPage />}
            />
            <Route
              path="/rw/services/graphic-design"
              element={<GraphicDesignPage />}
            />
            <Route path="/services/digital-marketing" element={<Navigate to="/services/visibilite-locale" replace />} />
            <Route path="/en/services/digital-marketing" element={<Navigate to="/en/services/visibilite-locale" replace />} />
            <Route path="/fr/services/digital-marketing" element={<Navigate to="/fr/services/visibilite-locale" replace />} />
            <Route path="/nl/services/digital-marketing" element={<Navigate to="/nl/services/visibilite-locale" replace />} />
            <Route path="/rw/services/digital-marketing" element={<Navigate to="/rw/services/visibilite-locale" replace />} />

            {/* Admin Dashboard Routes - moved here and consolidated */}
            <Route
              path="/secure-admin-dashboard-2024"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secure-admin-dashboard-2024/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer />
      <CookieConsent />
    </HelmetProvider>
  </React.StrictMode>
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(appElement);






