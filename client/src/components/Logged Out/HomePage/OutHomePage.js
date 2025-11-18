import NavBar from '../Layout/NavBar/NavBar';
import WelcomeMessage from '../Layout/WelcomMessage/WelcomeMessage';
import PopularMovies from '../../Layout/PopularMovies/PopularMovies';
import UpcomingMovies from '../../Layout/UpcomingMovies/UpcomingMovies';

function OutHomePage() {
    return (
        <div>
            <NavBar />
            <WelcomeMessage />
            <PopularMovies />
            <UpcomingMovies />
        </div>
    );
}

export default OutHomePage;