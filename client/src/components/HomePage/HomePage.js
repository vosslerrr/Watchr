import React, { useState, useRef, useEffect } from "react";
import "./home.css";
import NavBar from '../layout/navBar/NavBar';
import PopularMovies from '../layout/popularMovies/PopularMovies';

function HomePage() {
   

  return (
    <div>
    <NavBar />
    <main>
    <PopularMovies />
    </main>
    </div>
  );
}

export default HomePage;