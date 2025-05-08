import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaIndustry,
  FaUserTie,
} from "react-icons/fa";
import makeRequest from "../axios";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

const Home = () => {
  const [employers, setEmployers] = useState([]);
  const [loadingEmployers, setLoadingEmployers] = useState(true);
  const [employerError, setEmployerError] = useState("");
const navigate=useNavigate()
  const fetchEmployers = async () => {
    try {
      setLoadingEmployers(true);
      const res = await makeRequest.get("/admin/getall-employers/");
      setEmployers(res.data);
      console.log(res.data);
      
    } catch (err) {
      setEmployerError("Failed to load employers");
    } finally {
      setLoadingEmployers(false);
    }
  };
  useEffect(() => {
    
    fetchEmployers();
  }, []);
const fetchJobs = ({ title, location }) => {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (location) params.append("location", location);
  
  navigate(`/candidate/jobs?${params.toString()}`);
};

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen">
    {/* Hero Section */}
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-400 text-white py-16">
  <div className="max-w-5xl mx-auto text-center px-4">
    <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
      Find the Right Job For You
    </h1>
    <p className="text-lg sm:text-xl text-blue-100 mb-6">
      Browse thousands of job opportunities with top companies
    </p>
    <div className="max-w-3xl mx-auto">
      <SearchBar onSearch={fetchJobs} />
    </div>
  </div>
</section>

  
    {/* Top Companies */}
    <section className="py-12">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Top Companies Hiring Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {employers.slice(0, 8).map((emp, idx) => (
          <div key={idx} className="bg-white border hover:shadow-lg transition rounded-lg p-4 flex flex-col items-center">
            <img src={`https://consultancy.scholarnet.in${emp.organization_logo}`} alt={emp.company_name} className="h-16 w-16 object-contain mb-3" />
            <h3 className="text-md font-semibold text-blue-700 text-center">{emp.company_name}</h3>
            <p className="text-sm text-gray-500 text-center">{emp.industry_type || "Industry not specified"}</p>
            <p className="text-xs text-gray-400 text-center">{emp.city || "Location not specified"}</p>
          </div>
        ))}
      </div>
    </section>
  
    {/* Featured Carousel */}
    <section className="bg-gray-100 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10">Featured Companies Actively Hiring</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
        loop
        autoplay={{ delay: 2500 }}
      >
        {employers.map((emp, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src={`https://consultancy.scholarnet.in${emp.organization_logo}`} alt={emp.company_name} className="h-20 w-20 object-contain mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-blue-600">{emp.company_name}</h3>
              <p className="text-sm text-gray-500">{emp.industry_type}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  
    {/* Sponsored Section */}
    <section className="bg-gradient-to-br from-indigo-400 to-purple-500 py-12 text-white">
      <h2 className="text-3xl font-semibold text-center mb-10">Sponsored Companies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {employers.slice(0, 8).map((emp, idx) => (
          <div key={idx} className="bg-white text-black rounded-lg p-4 shadow-lg text-center">
            <img src={`https://consultancy.scholarnet.in${emp.organization_logo}`} alt={emp.company_name} className="h-16 w-16 mx-auto object-contain mb-3" />
            <h3 className="text-md font-bold text-indigo-700">{emp.company_name}</h3>
            <p className="text-sm text-gray-600">{emp.industry_type}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
  
  );
};

export default Home;
