import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/InHomePage';
import ProfilePage from './ProfilePage/InProfilePage';
import MoviePage from './MoviePage/InMoviePage';
import SeeAllUpcomingPage from './SeeAllUpcomingPage/InSeeAllUpcomingPage';
import SeeAllPopularPage from './SeeAllPopularPage/InSeeAllPopularPage';

function LoggedInRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/user/:username" element={<ProfilePage />} />
            <Route path="/popularmovies" element={<SeeAllPopularPage />} />
            <Route path="/upcomingmovies" element={<SeeAllUpcomingPage />} />
        </Routes>
    );
}

export default LoggedInRoutes;