import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Homepage from "./Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from "./SearchResults";
import MovieDetail from "./MovieDetails";
import NowPlayingPage from "./NowPlayingPage";
import PopularPage from "./PopularPage";
import TopRatedPage from "./TopRatedPage";
import "./App.css";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/top-rated",
      element: <TopRatedPage />,
    },
    {
      path: "/search-results",
      element: <SearchResults />,
    },
    {
      path: "/movie-details",
      element: <MovieDetail />,
    },
    {
      path: "/now-playing",
      element: <NowPlayingPage />,
    },
    {
      path: "/popular",
      element: <PopularPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
