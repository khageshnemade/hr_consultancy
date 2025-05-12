// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaBuilding,
//   FaIndustry,
//   FaMapMarkerAlt,
//   FaUserTie,
// } from "react-icons/fa";

// const EmployerList = () => {
//   const [employers, setEmployers] = useState([]);
//   const [loadingEmployers, setLoadingEmployers] = useState(true);
//   const [employerError, setEmployerError] = useState(null);

//   useEffect(() => {
//     const fetchEmployers = async () => {
//       try {
//         const response = await axios.get(
//           "https://consultancy.scholarnet.in/api/admin/getall-employers/"
//         );
//         setEmployers(response.data);
//       } catch (err) {
//         console.error("Error fetching employers:", err);
//         setEmployerError("Failed to fetch employer data.");
//       } finally {
//         setLoadingEmployers(false);
//       }
//     };

//     fetchEmployers();
//   }, []);

//   return (
//     <section className="mt-12 px-4 pt-12 max-w-screen-xl mx-auto">
//     <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
//       🏢 Top Companies Hiring Now
//     </h2>
  
//     {loadingEmployers ? (
//       <p className="text-blue-600 text-center text-lg font-medium">Loading employers...</p>
//     ) : employerError ? (
//       <p className="text-red-600 text-center text-lg font-medium">{employerError}</p>
//     ) : (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {employers.map((emp, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-4 flex flex-col border border-gray-200"
//           >
//             <div className="flex items-center gap-4 mb-3">
//               <img
//                 src={`https://consultancy.scholarnet.in${emp.organization_logo}`}
//                 alt={emp.company_name}
//                 className="h-14 w-14 object-contain rounded-lg border border-gray-300"
//               />
//               <div>
//                 <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
//                   <FaBuilding className="text-blue-600 text-sm" />
//                   {emp.company_name}
//                 </h3>
//                 {emp.industry_type && (
//                   <span className="inline-block mt-1 text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full">
//                     {emp.industry_type}
//                   </span>
//                 )}
//               </div>
//             </div>
  
//             <div className="text-sm text-gray-700 space-y-1 mb-3">
//               <p className="flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-orange-500 text-sm" />
//                 {emp.city || "City not specified"}
//               </p>
//               <p className="flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-red-500 text-sm" />
//                 {emp.district || "District not specified"}
//               </p>
//             </div>
  
//             {emp.reprsentative_name && (
//               <p className="text-xs text-gray-600 mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
//                 <FaUserTie className="text-green-600 text-sm" />
//                 Contact: {emp.reprsentative_name}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     )}
//   </section>
  
//   );
// };

// export default EmployerList;

import React from "react";
import { useQuery } from "@tanstack/react-query"; // Ensure you're using React Query v5
import axios from "axios";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";

// Function to fetch the employers' data
const fetchEmployers = async () => {
  const response = await axios.get(
    "https://consultancy.scholarnet.in/api/admin/getall-employers/"
  );
  return response.data;
};

const EmployerList = () => {
  // Use React Query's useQuery hook to fetch the employers' data
  const { data: employers, error, isLoading } = useQuery({
    queryKey: ["employers"], // This is now queryKey as an object property
    queryFn: fetchEmployers,  // This is now queryFn as an object property
  });

  return (
    <section className="mt-12 px-4 pt-12 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        🏢 Top Companies Hiring Now
      </h2>

      {/* Loading state */}
      {isLoading ? (
        <p className="text-blue-600 text-center text-lg font-medium">
          Loading employers...
        </p>
      ) : error ? (
        <p className="text-red-600 text-center text-lg font-medium">
          Failed to fetch employer data.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {employers.map((emp, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-4 flex flex-col border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={`https://consultancy.scholarnet.in${emp.organization_logo}`}
                  alt={emp.company_name}
                  className="h-14 w-14 object-contain rounded-lg border border-gray-300"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <FaBuilding className="text-blue-600 text-sm" />
                    {emp.company_name}
                  </h3>
                  {emp.industry_type && (
                    <span className="inline-block mt-1 text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full">
                      {emp.industry_type}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-orange-500 text-sm" />
                  {emp.city || "City not specified"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  {emp.district || "District not specified"}
                </p>
              </div>

              {emp.reprsentative_name && (
                <p className="text-xs text-gray-600 mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                  <FaUserTie className="text-green-600 text-sm" />
                  Contact: {emp.reprsentative_name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmployerList;

