import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/OutHomePage';
import LogIn from './Log-In/LogIn';
import Register from './Register/Register';
import OutMoviePage from './MoviePage/OutMoviePage';
import SeeAllPopularPage from './SeeAllPopularPage/OutSeeAllPopularPage';
import SeeAllUpcomingPage from './SeeAllUpcomingPage/OutSeeAllUpcomingPage';

function LoggedOutRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:movieId" element={<OutMoviePage />} />
            <Route path="/popularmovies" element={<SeeAllPopularPage />} />
            <Route path="/upcomingmovies" element={<SeeAllUpcomingPage />} />
        </Routes>
    );
}

export default LoggedOutRoutes;