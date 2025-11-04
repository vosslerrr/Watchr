import NavBar from "../layout/NavBar/NavBar"
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
      <ul>
        {movies.map((m, index) => (
          <li key={m.id}>
            {details[index]?.poster_path?.[0] && (
              <img src={`https://image.tmdb.org/t/p/w500${details[index].poster_path}`}/>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
