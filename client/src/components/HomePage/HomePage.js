import NavBar from "../layout/NavBar/NavBar"
import Register from "../Register/Register"
import React, { useEffect, useState } from "react";
import { getMovieDetails, getPopularMovies } from "../../utils/api";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getPopularMovies()
      .then(data => setMovies(data.results));
  }, []);

  useEffect(() => {
    Promise.all(
      movies.map(movie => getMovieDetails(movie.id))
    )
      .then(allDetails => setDetails(allDetails));
  }, [movies]);

  return (
    <div>
      <NavBar />
      <Register />
    </div>
  );
}

export default HomePage;
