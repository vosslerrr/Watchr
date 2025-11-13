import NavBar from '../Layout/NavBar/NavBar';
import FriendReviews from '../Layout/FriendReviews/FriendReviews';
import PopularMovies from '../Layout/PopularMovies/PopularMovies';
import UpcomingMovies from '../Layout/UpcomingMovies/UpcomingMovies';

function InHomePage() {
  return (
    <div>
      <NavBar />
      <FriendReviews />
      <PopularMovies />
      <UpcomingMovies />
    </div>
  );
}

export default InHomePage;