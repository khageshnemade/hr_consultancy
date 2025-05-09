import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10 px-6 w-full border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-gray-300">

        {/* Branding */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">HR Consultancy</h2>
          <p>We help companies build efficient and people-first HR systems that scale with business growth.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-white">Company</h3>
          <ul className="space-y-1">
            <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600">Blog</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-white">Legal</h3>
          <ul className="space-y-1">
            <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-blue-600">Terms of Service</Link></li>
            <li><Link to="/faq" className="hover:text-blue-600">FAQ</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-white">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} HR Consultancy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
