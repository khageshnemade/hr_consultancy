import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaIndustry,
  FaUserTie,
  FaStar
} from "react-icons/fa";
import makeRequest from "../axios";
import SearchBar from "../components/SearchBar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // ✅ CORRECT FOR VITE + SWIPER V9+
import 'swiper/css';
import 'swiper/css/navigation';

const Home = () => {
  const [employers, setEmployers] = useState([]);
  const [loadingEmployers, setLoadingEmployers] = useState(true);
  const [employerError, setEmployerError] = useState("");
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (startIndex + itemsPerPage < employers.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleEmployers = employers.slice(startIndex, startIndex + itemsPerPage);

  const fetchEmployers = async () => {
    try {
      setLoadingEmployers(true);
      const res = await makeRequest.get("/admin/getall-employers/");
      setEmployers(res.data);
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
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-400 text-white py-32 flex items-center justify-center mt-0 h-screen">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center px-4 z-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
            Find the Right Job For You
          </h1>
          <p className="text-lg sm:text-2xl text-blue-100 mb-8">
            Browse thousands of job opportunities with top companies
            <br />
            Discover roles that match your skills, passions, and career goals.
          </p>

          <div className="w-full max-w-3xl mx-auto">
            <SearchBar onSearch={fetchJobs} />
          </div>
        </div>
      </section>



      {/* Top Companies Section */}
      <section className="py-12 bg-gradient-to-b from-white via-gray-50 to-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Top Companies Hiring Now
        </h2>

        {loadingEmployers ? (
          <div className="text-center text-blue-500 font-medium py-8">
            Loading top companies...
          </div>
        ) : employerError ? (
          <div className="text-center text-red-500 py-8">{employerError}</div>
        ) : (
          <div className="flex justify-center">
            <div
              className={`flex gap-4 overflow-x-auto px-4 py-2 max-w-7xl w-full ${employers.length < 4 ? "justify-center" : ""
                } scrollbar-thin scrollbar-thumb-blue-200`}
            >
              {employers.map((emp, idx) => (
                <div
                  key={idx}
                  className="min-w-[180px] h-[200px] bg-blue-50 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 p-3 flex flex-col justify-between text-center"
                >
                  <img
                    src={`https://consultancy.scholarnet.in${emp.organization_logo}`}
                    alt={emp.company_name}
                    className="h-16 w-16 object-contain mx-auto mb-2"
                  />

                  <h3 className="text-sm font-semibold text-blue-700">
                    <FaBuilding className="inline mr-1 text-blue-400" />
                    {emp.company_name}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1">
                    <FaIndustry className="inline mr-1 text-indigo-400" />
                    {emp.industry_type || "Not specified"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    <FaMapMarkerAlt className="inline mr-1 text-green-400" />
                    {emp.city || "Location not specified"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    <FaUserTie className="inline mr-1 text-pink-400" />
                    {emp.reprsentative_name || "Representative"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>



      {/* Featured Carousel */}
      <section className="bg-white py-10 bg-gradient-to-br from-blue-600 to-blue-400">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Featured Companies Actively Hiring
        </h2>

        <div className="relative px-4">
          <Swiper
            modules={[Navigation]}
            navigation
            loop={false}
            spaceBetween={16}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4 },
            }}
          >

            {employers.map((emp, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 text-center flex flex-col justify-between h-full min-h-[260px]">
                  <img
                    src={`https://consultancy.scholarnet.in${emp.organization_logo}`}
                    alt={emp.company_name}
                    className="h-20 w-20 object-contain mx-auto mb-3"
                  />

                  <div className="bg-gray-50 rounded-md py-1.5 px-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {emp.company_name}
                    </h3>
                    <div className="flex items-center justify-center text-xs text-gray-500 mt-0.5">
                      <FaStar className="text-yellow-400 mr-1" />
                      4.0 <span className="mx-1">|</span>
                      <span className="text-blue-500">200+ reviews</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3">
                    {emp.industry_type || "Innovating the future."}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/candidate/jobs?company=${emp.company_name}`)
                    }
                    className="mt-auto bg-blue-100 text-blue-600 font-semibold px-3 py-1.5 rounded-full text-xs hover:bg-blue-200 transition cursor-pointer"
                  >
                    View Jobs
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


      {/* Sponsored Section */}
      <section className="py-8 text-white bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sponsored Companies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-2">
          {visibleEmployers.map((emp, idx) => (
            <div
              key={idx}
              className="bg-white text-black rounded-lg p-4 shadow hover:shadow-lg transition duration-300 text-center border"
            >
              <img
                src={`https://consultancy.scholarnet.in${emp.organization_logo}`}
                alt={emp.company_name}
                className="h-14 w-14 mx-auto object-contain mb-2"
              />
              <h3 className="text-sm font-semibold text-indigo-700 truncate">
                {emp.company_name}
              </h3>
              <p className="text-xs text-gray-600 truncate">{emp.industry_type}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= employers.length}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;


