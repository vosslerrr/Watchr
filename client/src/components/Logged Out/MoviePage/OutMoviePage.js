import NavBar from "../Layout/NavBar/NavBar";
import MovieDescription from "../Layout/MovieDescription/MovieDescription";
import MovieReviews from "../Layout/MovieReviews/MovieReviews";

function OutMoviePage() {
  return (
    <div>
      <NavBar />
      <MovieDescription />
      <MovieReviews />
    </div>
  );
}

export default OutMoviePage;