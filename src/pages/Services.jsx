import React from "react";
import { Briefcase, Users, CheckCircle, Heart, Zap, Shield } from "lucide-react";

const services = [
  {
    icon: <Briefcase size={32} />,
    title: "Consulting",
    description:
      "We offer expert consulting services to help your business grow with tailored strategies.",
  },
  {
    icon: <Users size={32} />,
    title: "Recruitment",
    description:
      "Our recruitment services connect you with top talent, making sure you find the right fit.",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Employee Training",
    description:
      "We provide high-quality training to enhance the skills of your workforce and boost productivity.",
  },
  {
    icon: <Heart size={32} />,
    title: "Employee Wellbeing",
    description:
      "We offer wellness programs that promote a healthy work-life balance for your employees.",
  },
  {
    icon: <Zap size={32} />, // Changed from Lightning to Zap
    title: "Performance Management",
    description:
      "Optimize employee performance with our customized solutions and management strategies.",
  },
  {
    icon: <Shield size={32} />,
    title: "Compliance & Risk Management",
    description:
      "Ensure your business complies with the latest laws and regulations with our expert guidance.",
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Our Services
        </h2>

        {/* Grid Layout for Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
