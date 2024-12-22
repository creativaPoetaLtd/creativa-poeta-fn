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
import ContentWrittings from './pages/Services/ContentWrittingPage.tsx';
import DigitalMarketings from './pages/Services/DigitalMarketing.tsx';
import ProjectDevelopment from './pages/Services/ProjectDvpt.tsx';
import VideoCreationsPage from './pages/Services/VideoCreationPage.tsx';
import AdvertisingDesignPage from './pages/Services/AdvertisingDesignPage.tsx';
import DigitalSupportPage from './pages/Services/DigitalSupportPage.tsx';
import ScrollToTop from './ScrollToTop.tsx';
import ProjectFormPage from './pages/ProjectFormPage.tsx';
import JobsPages from './pages/JobsPages.tsx';
import LeaveInfoPage from './pages/LeaveInfoPage.tsx';
import ThankYouPage from './pages/ThankYouPage.tsx';
import WebPage from './pages/Services/WebAppPage.tsx';
import ContentPage from './pages/Services/ContentPage.tsx';
import GetBackToYou from './components/getBackToYou.tsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop /> {/* This will ensure every page starts from the top on navigation */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/FAQ" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/design" element={<DesignPage />} />
        <Route path="/services/content-writing" element={<ContentPage />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketings />} />
        <Route path="/services/project-development" element={<ProjectDevelopment />} />
        <Route path="/services/video-creation" element={<VideoCreationsPage />} />
        <Route path="/services/advertising-design" element={<AdvertisingDesignPage />} />
        <Route path="/services/web-app" element={<WebPage />} />
        <Route path="/services/digital-support" element={<DigitalSupportPage />} />
        <Route path="/career" element={<JobsPages />} />
        <Route path="/start-project" element={<ProjectFormPage />} />
        <Route path="/form-to-leave-info" element={<LeaveInfoPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/thank-you-for-applying" element={<GetBackToYou />} />
        
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
