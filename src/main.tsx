import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import DigitalMarketingPage from "./pages/Services/DigitalMarketing.tsx";
import GraphicDesignPage from "./pages/Services/GraphicDesignPage.tsx";
import Dashboard from "./Dashboard/Dashboard.tsx";
import BlogsPage from "./pages/BlogsPage.tsx";
import SingleBlogPage from "./pages/SingleBlogPage.tsx";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/career" element={<JobsPages />} /> */}
          <Route path="/start-project" element={<ProjectFormPage />} />
          <Route path="/form-to-leave-info" element={<LeaveInfoPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/thank-you-for-applying" element={<GetBackToYou />} />
          {/* <Route path="/blogs" element={<BlogsPage />} /> */}
          {/* <Route path="/blogs/:id" element={<SingleBlogPage />} /> */}
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
          <Route path="/secure-admin-register-2024" element={<Signup />} />
          <Route path="/secure-admin-login-2024" element={<Login />} />

          {/* Valid servicessss */}
          <Route path="/services/web-app" element={<WebPage />} />
          <Route path="/services/content-writing" element={<ContentPage />} />
          <Route
            path="/services/graphic-design"
            element={<GraphicDesignPage />}
          />
          <Route
            path="/services/digital-marketing"
            element={<DigitalMarketingPage />}
          />

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
  </React.StrictMode>,
  document.getElementById("root")
);
