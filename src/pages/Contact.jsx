import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-gray-800">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have a question or need assistance? We’d love to hear from you.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <MapPin className="text-blue-600" size={24} />
            <div>
              <h3 className="font-semibold">Office Address</h3>
              <p className="text-gray-600">123 Business Street, Pune, Maharashtra, India</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="text-green-600" size={24} />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="text-red-600" size={24} />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">contact@hrconsultancy.in</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-md">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
