import React, { useState, useRef, useEffect } from "react";
import './seeAllPopular.css';
import { getMovieDetails, getPopularMovies } from '../../../utils/api';
import { Link } from 'react-router-dom';

function SeeAllPopular() {

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
    <div id="seeAllPopularContainer">
        <span id="seeAllPopularHeader">Current Popular Movies</span>

        <div id="seeAllPopularWrapper">
            {movies.map((m, index) => {
                const poster = details[index]?.poster_path;

                return poster ? (
                    <div id="seeAllPopularMoviePosters" key={m.id}>
                        <Link to={`/movie/${details[index].id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500${details[index].poster_path}`} />
                            
                            <div id="seeAllPopularOverlay">
                                <h3>{details[index].title}</h3>
                                <p>{details[index].release_date?.slice(0, 4)}</p>
                            </div>
                        </Link>
                    </div>
                ) : null;
            })}
        </div>
    </div>
);

}

export default SeeAllPopular;
