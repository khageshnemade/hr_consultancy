import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, defaultTitle = "", defaultLocation = "" }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [locationQuery, setLocationQuery] = useState(defaultLocation);

  const handleSearchClick = () => {
    onSearch({
      title: title.trim(),
      location: locationQuery.trim(),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-lg shadow-sm p-3 w-full gap-2 sm:gap-3 max-w-2xl">
      <input
        type="text"
        placeholder="Title..."
        className="w-full text-sm outline-none text-gray-700 border border-gray-200 rounded-md px-3 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input
        type="text"
        placeholder="Location..."
        className="w-full text-sm outline-none text-gray-700 border border-gray-200 rounded-md px-3 py-2"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSearchClick}
        className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center justify-center"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
