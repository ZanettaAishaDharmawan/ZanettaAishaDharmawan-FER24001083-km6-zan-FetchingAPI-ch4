import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Navbar({ searchTerm, setSearchTerm }) {
  const location = useLocation();
  const [navbarBackground, setNavbarBackground] = useState("bg-background");

  const handleSearch = () => {
    // Navigate to the search results page with the search term as a query parameter
    window.location.href = `/search-results?query=${searchTerm}`;
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNavbarBackground("bg-black bg-opacity-75");
    } else {
      setNavbarBackground("bg-background");
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <nav className={`py-5 fixed top-0 w-full z-10 px-12 ${navbarBackground}`}>
      <div className="flex justify-between items-center">
        <a href="/" className="text-red-500 text-xl font-bold ">
          MOFLIX
        </a>
        <div className="hidden md:flex items-center gap-5">
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="relative w-[600px]">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="bg-transparent text-white px-4 py-2 rounded-ld w-full focus:outline-none focus:ring focus:border-blue-200"
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="/popular">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                Popular
              </p>
            </a>
            <a href="/now-playing">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                Now Playing
              </p>
            </a>
            <a href="/top-rated">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                Top Rated
              </p>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
