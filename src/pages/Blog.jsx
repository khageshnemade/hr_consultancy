import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Make Your Resume Stand Out",
    excerpt:
      "In a competitive job market, your resume needs to stand out. Here are five proven tips to catch recruiters' attention.",
    image: "images/stand_out_resume.jpg",
    slug: "resume-tips",
  },
  {
    id: 2,
    title: "How to Prepare for HR Interviews",
    excerpt:
      "HR interviews can be tricky — learn how to answer behavioral questions and present yourself professionally.",
    image: "images/hr_interview.png",
    slug: "hr-interview-preparation",
  },
  {
    id: 3,
    title: "Why Employers Should Invest in Talent Branding",
    excerpt:
      "Attracting the right talent starts with branding. Here’s how HR teams can build a strong employer brand.",
    image: "images/emp_branding.jpg",
    slug: "talent-branding",
  },
];

const Blog = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">HR Blog & Insights</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
