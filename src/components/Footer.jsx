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
    <footer className="bg-gray-100 mt-6 dark:bg-gray-900 py-10 px-8 w-full border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
        {/* Branding or Logo */}
        <div className="mb-4 md:mb-0 font-semibold text-lg text-gray-800 dark:text-white">
          MyCompany
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-blue-600">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="hover:text-blue-700">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
