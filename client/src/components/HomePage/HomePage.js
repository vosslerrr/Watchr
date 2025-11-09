import React, { useState, useRef, useEffect } from "react";
import "./home.css";
import NavBar from '../layout/NavBar/NavBar';
import PopularMovies from '../layout/PopularMovies/PopularMovies';
import UpcomingMovies from '../layout/upcomingMovies/UpcomingMovies';
import FriendReviews from "../layout/friendReviews/FriendReviews";

function HomePage() {
  return (
    <div>
      <NavBar />
      <FriendReviews />
      <PopularMovies />
      <UpcomingMovies />
    </div>
  );
}

export default HomePage;
