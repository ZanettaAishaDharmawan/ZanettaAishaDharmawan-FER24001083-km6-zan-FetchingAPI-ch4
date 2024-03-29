import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating / 2) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-400">
          ★
        </span>
      );
    }
  }
  return <div>{stars}</div>;
};

const Pagination = ({ totalPages, currentPage, onPageClick }) => {
  const pagesToShow = 8;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div>
      <div className="container mt-8 flex justify-center">
        {currentPage > 1 && (
          <button
            onClick={() => onPageClick(currentPage - 1)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Previous
          </button>
        )}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageClick(page)}
            className={`${
              currentPage === page
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-gray-300"
            } px-4 py-2 rounded-md hover:bg-gray-700 transition`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => onPageClick(currentPage + 1)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching top rated movies: ", error);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, [currentPage]);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state update on unmounted component
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        );
        if (isMounted) {
          setSearchResults(response.data.results);
          setTotalPages(response.data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching search results: ", error);
      }
    };

    if (searchTerm) {
      setCurrentPage(1); // Reset current page to 1 when performing a search
      fetchSearchResults();
    } else {
      setSearchResults([]);
      fetchTopRatedMovies();
    }

    return () => {
      isMounted = false; // Clean up to prevent state update on unmounted component
    };
  }, [searchTerm]);

  const handleClick = (movieId) => {
    setSelectedMovie(selectedMovie === movieId ? null : movieId);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const displayMovies = searchTerm ? searchResults : movies;

  return (
    <div>
      <div
        className="bg-black text-white min-h-screen pt-16"
        style={{
          backgroundImage: `url('https://th.bing.com/th/id/OIP.Js2Z_cdwsWWnK84YE5w2RgHaNK?w=1080&h=1920&rs=1&pid=ImgDetMain')`,
          backgroundSize: "center",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="task-bar mb-4">
            <h2 className=" text-red-500 text-3xl font-semibold">
              Top Rated Movies
            </h2>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-gray-800 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute right-3 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 17.5l4.5 4.5"
              />
            </svg>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayMovies.length > 0 ? (
              displayMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform"
                  onClick={() => handleClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-96 object-cover"
                  />
                  <div
                    className={`absolute top-0 left-0 right-0 bottom-0 ${
                      selectedMovie === movie.id
                        ? "bg-gray-900 bg-opacity-90"
                        : "bg-gradient-to-t from-black to-transparent opacity-75"
                    }`}
                  ></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-gray-400">{movie.release_date}</p>
                    <p className="text-yellow-400">
                      Rating:
                      {movie.vote_average}
                    </p>
                    <StarRating rating={movie.vote_average} />
                  </div>
                  {selectedMovie === movie.id && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-90 p-4 flex flex-col justify-center items-center">
                      <p className="text-lg text-white">{movie.title}</p>
                      <p className="text-yellow-400">
                        Rating: {movie.vote_average}
                      </p>
                      <StarRating rating={movie.vote_average} />
                      <p className="text-sm text-white mt-2">
                        {movie.overview}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMovie(null);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white">No results found.</p>
            )}
          </div>
          {totalPages >= 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageClick={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRatedMovies;
