import React, { useState, useRef, useEffect } from "react";
import './popularMovies.css';

function PopularMovies(){

    return(
        <div className="movieBar">
            <div id="movie1"><a href="/movies"><img src="/movie-good-boy.jpg"></img></a></div>
            <div id="movie2"><a href="/movies"><img src="/movie-good-boy.jpg"></img></a></div>
            <div id="movie3"><a href="/movies"><img src="/movie-good-boy.jpg"></img></a></div>
            <div id="movie4"><a href="/movies"><img src="/movie-good-boy.jpg"></img></a></div>
            <div id="movie5"><a href="/movies"><img src="/movie-good-boy.jpg"></img></a></div>
            <div id="movie6"><a href="/movies"><img src="/movie-good-boy.jpg"></img></a></div>
        </div>

    );
}
export default PopularMovies;