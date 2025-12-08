import React, { useState, useRef, useEffect } from "react";
import './upcomingMovies.css';
import { getMovieDetails, getUpcomingMovies } from '../../../utils/api';
import { Link } from "react-router-dom";

function UpcomingMovies(){
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

    const upcomingMoviesRef = useRef(null);
    const scrollLeft = () => {
        if(upcomingMoviesRef.current) {
            upcomingMoviesRef.current.scrollLeft -= 1255;
        }
    }
    const scrollRight = () => {
        if(upcomingMoviesRef.current) {
            upcomingMoviesRef.current.scrollLeft += 1255;
        }
    }

    return(
            <section className="upcomingMoviesSection">
                <div className="upcomingHeader">
                    <h2 className="upcomingTitle">Upcoming Movies</h2>
                    <a href="/upcomingmovies" className="seeAllupcoming">SEE ALL</a>
                    
                </div>
                <div className="upcomingMovieBar">
                    <div id="left">
                        <button id="upcomingMoviesLeft" onClick={scrollLeft}>
                            <img src="/left-arrow.png"></img>
                        </button>
                    </div>
                    <div id="upcomingMovies" ref={upcomingMoviesRef}>    
                        {movies.map((m, index) => {
                            const poster = details[index]?.poster_path;

                            return(
                                poster ? (
                                    <div id="upcomingMoviePosters" key={m.id}>
                                        <Link to={`/movie/${details[index].id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${details[index].poster_path}`}/>
                                        
                                        <div id="upcomingMoviesOverlay">
                                            <h3>{details[index].title}</h3>
                                            <p>{details[index].release_date?.slice(0,4)}</p>
                                        </div>
                                        </Link>
                                    </div>
                                ) : null
                            );
                        })}
                    </div>
                    <div id="right">
                        <button id="upcomingMoviesRight" onClick={scrollRight}>
                            <img src="/right-arrow.png"></img>
                        </button>
                    </div>
                </div>
            </section>
    );
}
export default UpcomingMovies;