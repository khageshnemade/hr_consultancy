import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import CandidateRegister from "./components/Candidate/CandidateRegister";
import EmployerRegister from "./components/Employer/EmployerRegister";
import LoginForm from "./pages/LoginForm";
import JobPostForm from "./components/Employer/JobPostForm";
import EmployerDashboard from "./components/Employer/EmployerDashboard";
import JobListings from "./components/Employer/JobListing";
import JobDetails from "./components/Employer/JobDetails";
import UpdateJob from "./components/Employer/UpdateJob";
import EmployerProfile from "./components/Employer/EmployerProfile";
import JobList from "./components/Candidate/JobList";
import JobDetail from "./components/Candidate/JobDetail";
import Dashboard from "./components/Candidate/Dashboard";
import AppliedJobs from "./components/Candidate/AppliedJobs";
import CandidateProfile from "./components/Candidate/CandidateProfile ";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Candidates from "./components/Admin/Candidates";
import Employers from "./components/Admin/Employers";
import AdminJobDetails from "./components/Admin/AdminJobDetails";
import JobApplications from "./components/Admin/JobApplications";
import EmployerDetail from "./components/Admin/EmployerDetail";
import CandidateDetails from "./components/Admin/CandidateDetails";
import ApplicationView from "./components/Employer/ApplicationView";
import UpdateApplicationStatus from "./components/Employer/UpdateApplicationStatus ";
import EmpApplications from "./components/Employer/EmApplications";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/Services";
import EmployerList from "./pages/EmployerList";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import Blog from "./pages/Blog";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="companies" element={<EmployerList />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="blog" element={<Blog />} />

        {/* ---------------------------------------Admin------------------------------------------------------- */}
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/candidates" element={<Candidates />} />
        <Route
          path="/admin/candidate-details/:candidateId"
          element={<CandidateDetails />}
        />
        <Route path="admin/employers" element={<Employers />} />
        <Route
          path="admin/employers/:company_name/:org_id"
          element={<AdminJobDetails />}
        />
        <Route
          path="admin/applications/:job_id"
          element={<JobApplications />}
        />
        <Route path="/admin/employer/:org_id" element={<EmployerDetail />} />
        {/* ---------------------------------------Candidate------------------------------------------------------- */}
        <Route path="candidate" element={<CandidateRegister />} />
        <Route path="candidate/jobs" element={<JobList />} />
        <Route path="candidate/dashboard" element={<Dashboard />} />
        <Route path="candidate/profile" element={<CandidateProfile />} />
        <Route path="candidate/applied_jobs" element={<AppliedJobs />} />
        <Route
          path="candidate/applied_jobs/:status"
          element={<AppliedJobs />}
        />
        <Route path="/candidate/job-details/:jobId" element={<JobDetail />} />

        {/* ---------------------------------------Employer------------------------------------------------------- */}
        <Route path="employer" element={<EmployerRegister />} />
        <Route path="employer/post" element={<JobPostForm />} />
        <Route path="employer/dashboard" element={<EmployerDashboard />} />
        <Route
          path="/employer/applications/:title/:job_id"
          element={<ApplicationView />}
        />
        <Route path="/employer/applications" element={<EmpApplications />} />
        <Route
          path="/employer/update-status/:istatus/:app_id"
          element={<UpdateApplicationStatus />}
        />
        <Route path="employer/jobs" element={<JobListings />} />
        <Route path="employer/profile" element={<EmployerProfile />} />
        <Route path="employer/jobs/:job_id" element={<JobDetails />} />
        <Route path="/employer/jobs/update/:job_id" element={<UpdateJob />} />

        {/* Route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Routers;
