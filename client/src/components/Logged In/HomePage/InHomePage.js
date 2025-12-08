import NavBar from '../Layout/NavBar/NavBar';
import FriendReviews from '../Layout/FriendReviews/FriendReviews';
import PopularMovies from '../../Layout/PopularMovies/PopularMovies';
import UpcomingMovies from '../../Layout/UpcomingMovies/UpcomingMovies';
import Footer from '../../../components/Layout/Footer/Footer';
function InHomePage() {
    return (
        <div>
            <NavBar />
            <FriendReviews />
            <PopularMovies />
            <UpcomingMovies />
            <Footer />
        </div>
    );
}

export default InHomePage;