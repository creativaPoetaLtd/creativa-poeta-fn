import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import TermsAndConditions from './components/unUsedComponents/TermsAndConditions.tsx';
import TermsPage from './pages/TermsPage.tsx';
import FaqPage from './pages/FaqPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import ServicePage from './pages/ServicePage.tsx';
import CommencerProjectPage from './pages/CommencerProjectPage.tsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/FAQ" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/commencer-project" element={<CommencerProjectPage />} />
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
