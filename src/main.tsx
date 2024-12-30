import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsPage from './pages/TermsPage.tsx';
import FaqPage from './pages/FaqPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import DesignPage from './pages/Services/WebAppPage.tsx';
import ScrollToTop from './ScrollToTop.tsx';
import ProjectFormPage from './pages/ProjectFormPage.tsx';
import JobsPages from './pages/JobsPages.tsx';
import LeaveInfoPage from './pages/LeaveInfoPage.tsx';
import ThankYouPage from './pages/ThankYouPage.tsx';
import WebPage from './pages/Services/WebAppPage.tsx';
import ContentPage from './pages/Services/ContentPage.tsx';
import GetBackToYou from './components/getBackToYou.tsx';
import DigitalMarketingPage from './pages/Services/DigitalMarketing.tsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop /> {/* This will ensure every page starts from the top on navigation */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/FAQ" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/career" element={<JobsPages />} />
        <Route path="/start-project" element={<ProjectFormPage />} />
        <Route path="/form-to-leave-info" element={<LeaveInfoPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/thank-you-for-applying" element={<GetBackToYou />} />

        {/* Valid servicessss */}
        <Route path="/services/web-app" element={<WebPage />} />
        <Route path="/services/content-writing" element={<ContentPage />} />
        <Route path="/services/graphic-design" element={<DesignPage />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
        
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
