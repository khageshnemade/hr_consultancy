// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to SJSA</h1>
      <p className="text-gray-600 leading-relaxed">
        This is the homepage for your portal. Here you can add highlights,
        schemes, important announcements, and more. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Deleniti maiores quibusdam, ipsa dicta
        magnam voluptate quis provident magni aliquid ipsum nisi nesciunt
        voluptatibus dolore neque vitae facere iusto vel? Quidem tempora dicta
        minima, eligendi explicabo deleniti unde! Iure dignissimos maxime
        incidunt! Ad iusto, distinctio optio facere consequuntur, odio suscipit
        dolores eveniet, assumenda quod nemo saepe voluptate. Odit provident
        repellat labore, ducimus sit vero molestias voluptate aliquam deleniti
        similique odio quisquam culpa dolor quasi aperiam. Quae dolorem quaerat
        mollitia aut odio natus consequuntur minus, delectus tenetur, harum
        assumenda dolores laborum. Est laborum aperiam et sequi corrupti,
        mollitia ipsam possimus cum suscipit. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Soluta nostrum, rem rerum repudiandae
        aperiam voluptates assumenda laudantium, officiis quam tempore
        perspiciatis, totam corporis optio quaerat laboriosam sunt modi impedit
        esse aut nobis eum pariatur! Eveniet iusto alias deleniti fugiat a
        nesciunt eos non nisi at. Sunt quam quas obcaecati harum! Ex quidem
        aliquam facilis delectus libero, ea impedit natus reiciendis possimus,
        animi aspernatur inventore. Nihil voluptate, dolores amet nam corrupti
        dolore facilis culpa, laborum quod incidunt pariatur quo cupiditate a
        magni natus. Exercitationem doloribus ea eos accusantium, laboriosam,
        aperiam possimus qui consectetur corrupti modi porro consequatur quasi,
        libero cumque similique.
        <table className="table-auto w-full border border-gray-200 rounded-md shadow-sm mt-5">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Sr. No.</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            <tr className="hover:bg-gray-50">
              <td className="p-3">1</td>
              <td className="p-3">Khagesh</td>
              <td className="p-3">34</td>
            </tr>
            {/* More rows can go here */}
          </tbody>
        </table>
      </p>
    </div>
  );
};

export default Home;
