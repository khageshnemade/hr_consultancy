import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-28 m-20 bg-white shadow-lg rounded-md overflow-y-auto pt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">
          We, at Info Edge (India) Limited and our affiliated companies worldwide (hereinafter collectively referred to as "IEIL"), are committed to respecting your online privacy...
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Types of Personal Information collected by IEIL</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Personal details like name, email, contact number, and organization when signing up.</li>
          <li>Resume information such as education, experience, salary data.</li>
          <li>Usage data like log and location information.</li>
          <li>Information through surveys, cookies, and device data.</li>
          <li>Data from social media login and communications.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How IEIL may use your Personal Information</h2>
        <p className="text-gray-700">
          We use your data for service delivery, support, marketing, compliance, fraud prevention, and legal obligations...
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking Technologies</h2>
        <p className="text-gray-700">
          Cookies help us track usage, improve experience, and deliver tailored ads. You can manage cookie preferences in your browser.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Legal Grounds for Data Processing</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Consent where required by law.</li>
          <li>Compliance with legal obligations.</li>
          <li>Legitimate business interests.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Information Sharing and Disclosure</h2>
        <p className="text-gray-700">
          IEIL may share data with affiliates, recruiters, service providers, and under legal obligations, always under appropriate confidentiality measures.
        </p>
      </section>

      <footer className="mt-10 text-center text-sm text-gray-500">
        Last updated: May 7, 2025
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
