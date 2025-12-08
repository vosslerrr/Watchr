import React, { useState, useRef, useEffect } from "react";
import './seeAllUpcoming.css';
import { getMovieDetails, getUpcomingMovies } from '../../../utils/EC2api';
import { Link } from 'react-router-dom';

function SeeAllUpcoming() {

    const [movies, setMovies] = useState([]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        getUpcomingMovies()
            .then(data => setMovies(data.results));
    }, []);

    useEffect(() => {
        Promise.all(
            movies.map(movie => getMovieDetails(movie.id))
        )
            .then(allDetails => setDetails(allDetails));
    }, [movies]);

    return (
        <div id="seeAllUpcomingContainer">
            <span id="seeAllUpcomingHeader">Upcoming Movies</span>

            <div id="seeAllUpcomingWrapper">
                {movies.map((m, index) => {
                    const poster = details[index]?.poster_path;

                    return poster ? (
                        <div id="seeAllUpcomingMoviePosters" key={m.id}>
                            <Link to={`/movie/${details[index].id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${details[index].poster_path}`} />

                                <div id="seeAllUpcomingOverlay">
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
export default SeeAllUpcoming;
