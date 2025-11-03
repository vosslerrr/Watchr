import React, { useState, useRef, useEffect } from "react";
import './popularMovies.css';
import { getMovieDetails, getPopularMovies } from "../../../utils/api";

function PopularMovies(){
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

    return(
            <div>
                <div className="movieBar">
                    <div id="left">
                        <button id="popularMoviesLeft">
                            <img src="/left-arrow.png"></img>
                        </button>
                    </div>
                    <div id="popularMovies">    
                        {movies.map((m, index) => (
                            <div id="movie1" key={m.id}>
                                {details[index]?.poster_path?.[0] && (
                                <a href="/movies"><img src={`https://image.tmdb.org/t/p/w500${details[index].poster_path}`}/></a>
                                )}
                            </div>
                        ))}   
                    </div>
                    <div id="right">
                        <button id="popularMoviesRight">
                            <img src="/right-arrow.png"></img>
                        </button>
                    </div>
                </div>
            </div>
    );
}
export default PopularMovies;