import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // For toggling each item

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const studentFAQs = [
    {
      question: "How can I apply for a job?",
      answer:
        "To apply for a job, create an account, upload your resume, and click 'Apply' on any job listing that matches your profile.",
    },
    {
      question: "How long does the selection process take?",
      answer:
        "Most employers respond within 7–14 business days. You'll be notified via email or on your dashboard.",
    },
    {
      question: "Can I apply for multiple jobs at once?",
      answer:
        "Yes, you can apply to as many jobs as you'd like, as long as you're eligible.",
    },
    {
      question: "How do I track my job application status?",
      answer:
        "Login and check the 'My Applications' section to see updates from employers.",
    },
  ];

  const employerFAQs = [
    {
      question: "How many jobs can I post?",
      answer:
        "You can post up to 10 jobs for free. Additional job posts require a subscription plan.",
    },
    {
      question: "How do I review candidate applications?",
      answer:
        "Use your employer dashboard to view applicants, filter by skills, and download resumes.",
    },
    {
      question: "Can I highlight urgent jobs?",
      answer:
        "Yes, mark listings as 'Urgent' or upgrade to a premium listing for better visibility.",
    },
    {
      question: "Can I schedule interviews through the platform?",
      answer:
        "Yes. Our platform supports scheduling, reminders, and integrated video interviews.",
    },
  ];

  const renderFAQs = (faqs, offset) =>
    faqs.map((faq, index) => {
      const currentIndex = index + offset;
      const isOpen = openIndex === currentIndex;

      return (
        <div key={currentIndex} className="border-b pb-4 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => toggle(currentIndex)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {faq.question}
            </h3>
            <FaChevronDown
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              } text-gray-500`}
            />
          </div>
          {isOpen && <p className="mt-2 text-gray-600">{faq.answer}</p>}
        </div>
      );
    });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 pt-20">
      <h1 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">For Students / Job Seekers</h2>
        <div className="space-y-4">{renderFAQs(studentFAQs, 0)}</div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">For Employers</h2>
        <div className="space-y-4">{renderFAQs(employerFAQs, studentFAQs.length)}</div>
      </div>
    </div>
  );
};

export default FAQ;
