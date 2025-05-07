import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-700 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part, you must not use this platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
        <p>
          Users must be at least 18 years old. Employers must be legally authorized entities, and job seekers must provide truthful and accurate information during registration.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
        <p>
          Employers are responsible for the content of job postings and must comply with applicable labor and anti-discrimination laws. Job seekers must ensure the accuracy of their profiles and application materials.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Account Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Prohibited Activities</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Posting false or misleading job opportunities</li>
          <li>Submitting fraudulent resumes or documents</li>
          <li>Scraping or harvesting data from the platform</li>
          <li>Harassing or abusing other users</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
        <p>
          All content, logos, and designs on the platform are owned or licensed by HR Consultancy. You may not copy, reproduce, or redistribute any part of the platform without written consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at any time for violations of these Terms or misuse of the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
        <p>
          HR Consultancy is not liable for any direct, indirect, or consequential damages resulting from the use or inability to use the platform, including job loss or missed opportunities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
        <p>
          We may update these Terms periodically. Continued use of the platform after changes implies your acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at <a href="mailto:support@hrconsultancy.com" className="text-blue-600 hover:underline">support@hrconsultancy.com</a>.
        </p>
      </section>

      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        Last updated: May 7, 2025
      </div>
    </div>
  );
};

export default TermsOfService;
