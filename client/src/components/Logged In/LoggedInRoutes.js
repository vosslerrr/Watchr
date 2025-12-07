import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/InHomePage';
import ProfilePage from './ProfilePage/InProfilePage';
import MoviePage from './MoviePage/InMoviePage';
import FollowersPage from './FollowersPage/FollowersPage';
import FollowingPage from './FollowingPage/FollowingPage';
import SeeAllUserReviewsPage from './SeeAllUserReviewsPage/SeeAllUserReviews';
import SettingsPage from './SettingsPage/SettingsPage';

function LoggedInRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/user/:username" element={<ProfilePage />} />
            <Route path="/user/:username/followers" element={<FollowersPage />} />
            <Route path="/user/:username/following" element={<FollowingPage />} />
            <Route path="/user/:username/reviews" element={<SeeAllUserReviewsPage />} />
            <Route path="/user/:username/settings" element={<SettingsPage />} />
        </Routes>
    );
}

export default LoggedInRoutes;