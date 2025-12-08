import NavBar from '../Layout/NavBar/NavBar';
import WelcomeMessage from '../Layout/WelcomeMessage/WelcomeMessage';
import PopularMovies from '../../Layout/PopularMovies/PopularMovies';
import UpcomingMovies from '../../Layout/UpcomingMovies/UpcomingMovies';
import Footer from '../../../components/Layout/Footer/Footer';
function OutHomePage() {
    return (
        <div>
            <NavBar />
            <WelcomeMessage />
            <PopularMovies />
            <UpcomingMovies />
            <Footer />
        </div>
    );
}

export default OutHomePage;