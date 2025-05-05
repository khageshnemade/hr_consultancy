import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearchClick = () => {
    if (!title && !locationQuery) return;
    onSearch({ title, location: locationQuery });
  };

  return (
    <div className="hidden lg:flex items-center bg-white rounded-full shadow-sm px-3 py-1 w-[300px]">
      <input
        type="text"
        placeholder="Title..."
        className="w-full text-sm outline-none text-gray-700"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location..."
        className="w-full text-sm outline-none text-gray-700 ml-2"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
      />
      <button
        onClick={handleSearchClick}
        className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 ml-2"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
