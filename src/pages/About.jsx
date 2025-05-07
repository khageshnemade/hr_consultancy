// src/pages/About.jsx
import React from "react";
import { Users, Briefcase, Shield, BookOpen, Handshake, Target } from "lucide-react"; // Corrected icon import
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About HR Consultancy</h1>
        <p className="text-lg text-gray-600 max-w-5xl mx-auto">
          Empowering people. Enabling businesses. At <span className="font-semibold text-blue-600">HR Consultancy</span>, we deliver tailored HR solutions to help organizations thrive and individuals succeed in a competitive, evolving workplace.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 rounded-xl p-8 shadow-md mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Mission</h2>
        <p className="text-gray-700 text-center max-w-5xl mx-auto text-lg">
          We are dedicated to fostering inclusive, equitable, and growth-driven environments. By connecting the right talent with the right opportunities, we help build sustainable careers and high-performing organizations that adapt and excel in a dynamic world.
        </p>
      </section>

      {/* Optional: Add Visual CTA or quote */}
      <section className="text-center">
        <blockquote className="text-xl italic text-gray-500">
          "Our people-first approach is the foundation of everything we do — building better workplaces, together."
        </blockquote>
      </section>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1: Talent Acquisition */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Users size={40} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Talent Acquisition</h3>
            <p className="text-gray-600">
              We help businesses find, recruit, and retain top talent that fits their culture and values. Our approach ensures long-term success.
            </p>
          </div>

          {/* Service 2: Employee Training */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <BookOpen size={40} className="text-green-500 mb-4" /> {/* Updated to BookOpen */}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Employee Training</h3>
            <p className="text-gray-600">
              Empowering your workforce with the skills and knowledge they need to thrive in their roles. We offer tailored training programs for all levels.
            </p>
          </div>

          {/* Service 3: Workforce Optimization */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Briefcase size={40} className="text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Workforce Optimization</h3>
            <p className="text-gray-600">
              Improve productivity and engagement by optimizing your workforce. Our strategies ensure better performance and retention.
            </p>
          </div>

          {/* Service 4: Compliance & Risk */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Shield size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Compliance & Risk</h3>
            <p className="text-gray-600">
              Stay ahead of labor laws and regulations. We help you manage risk and ensure compliance in an ever-changing legal landscape.
            </p>
          </div>

          {/* Service 5: Leadership Development */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Target size={40} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Leadership Development</h3>
            <p className="text-gray-600">
              Equip your leadership team with the skills needed to lead with confidence, drive innovation, and motivate their teams.
            </p>
          </div>

          {/* Service 6: HR Consulting */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Handshake size={40} className="text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">HR Consulting</h3>
            <p className="text-gray-600">
              Providing expert advice and strategies for optimizing your HR processes, from recruitment to employee relations and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-12 rounded-xl shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg">
            <p className="text-2xl font-semibold text-blue-500 mb-4">Integrity</p>
            <p className="text-gray-600">
              We believe in honesty and transparency, ensuring ethical practices in all aspects of our services.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg">
            <p className="text-2xl font-semibold text-green-500 mb-4">Excellence</p>
            <p className="text-gray-600">
              We strive to provide exceptional service and results, constantly exceeding expectations.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg">
            <p className="text-2xl font-semibold text-purple-500 mb-4">Innovation</p>
            <p className="text-gray-600">
              We embrace change and innovation to stay ahead of industry trends and provide forward-thinking solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Interested in learning more about how we can help your business? Contact us today to schedule a consultation!
        </p>
        <Link to={'/contact'} className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default About;
