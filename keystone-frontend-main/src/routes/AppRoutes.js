import React from "react";
import { Route, Routes } from "react-router-dom";

import ContactPage from "../pages/ContactPage";
import { VisionPage } from "../pages/VisionPage";
import { TechnologyServicesPage } from "../pages/TechnologyServicesPage";
import { PropritiesPage } from "../pages/PropritiesSolutions";
import { MediaPage } from "../pages/MediaPage";
import { LeadershipPage } from "../pages/LeadershipPage";
import { InternationalVenturesPage } from "../pages/InternationalVentures";
import { HospitalityPage } from "../pages/HospitalityPage";
import { HealthcarePage } from "../pages/HealthcarePage";
import { EmergingTechnologyPage } from "../pages/EmergingTechnology";
import { ChartiesPage } from "../pages/CharitiesPage";
import { AboutPage } from "../pages/AboutPage";
import { HomePage } from "../pages/HomePage";
import { LocationPage } from "../pages/LocationPage";
import { KeystonePage } from "../pages/keystonePage";
import { GalleryPage } from "../pages/GalleryPage";
import { BlogPage } from "../pages/BlogPage";
import { BlogPostPage } from "../pages/BlogPostPage";
import { CookiesPage } from "../pages/CookiesPage";
import { TermsPage } from "../pages/TermsPage";
import ResourcesPage from "../pages/ResourcesPage";
import ResourceDownloadPage from "../pages/ResourceDownloadPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/aboutus/charity" element={<ChartiesPage />} />
        <Route
          path="/technology/emergingTechnology"
          element={<EmergingTechnologyPage />}
        />
        <Route path="/technology/healthcare" element={<HealthcarePage />} />
        <Route path="/technology/hospitality" element={<HospitalityPage />} />
        <Route
          path="/aboutus/internationalVentures"
          element={<InternationalVenturesPage />}
        />
        <Route path="/aboutus/leadership" element={<LeadershipPage />} />
        <Route path="/technology/media" element={<MediaPage />} />
        <Route path="/technology/proprities" element={<PropritiesPage />} />
        <Route
          path="/technology/services"
          element={<TechnologyServicesPage />}
        />
        <Route path="/aboutus/vision" element={<VisionPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/keystoneCompanies" element={<KeystonePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/download/:resourceId" element={<ResourceDownloadPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
