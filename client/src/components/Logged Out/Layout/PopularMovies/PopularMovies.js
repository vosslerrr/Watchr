import React, { useState, useRef, useEffect } from "react";
import './popularMovies.css';
import { getMovieDetails, getPopularMovies } from '../../../../utils/EC2api';

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

    const popularMoviesRef = useRef(null);
    const scrollLeft = () => {
        if(popularMoviesRef.current) {
            popularMoviesRef.current.scrollLeft -= 1265;
        }
    }
    const scrollRight = () => {
        if(popularMoviesRef.current) {
            popularMoviesRef.current.scrollLeft += 1265;
        }
    }

    return(
            <section className="popularMoviesSection">
                <div className="popularHeader">
                    <h2 className="popularTitle">Popular Movies</h2>
                    <a href="/movies" className="seeAll">SEE ALL</a>
                    
                </div>
                <div className="movieBar">
                    <div id="left">
                        <button id="popularMoviesLeft" onClick={scrollLeft}>
                            <img src="/left-arrow.png"></img>
                        </button>
                    </div>
                    <div id="popularMovies" ref={popularMoviesRef}>    
                        {movies.map((m, index) => (
                            <div id="movie1" key={m.id}>
                                {details[index]?.poster_path?.[0] && (
                                <a href={`https://themoviedb.org/movie/${details[index].id}`}><img src={`https://image.tmdb.org/t/p/w500${details[index].poster_path}`}/></a>
                                )}
                            </div>
                        ))}   
                    </div>
                    <div id="right">
                        <button id="popularMoviesRight" onClick={scrollRight}>
                            <img src="/right-arrow.png"></img>
                        </button>
                    </div>
                </div>
            </section>
    );
}
export default PopularMovies;