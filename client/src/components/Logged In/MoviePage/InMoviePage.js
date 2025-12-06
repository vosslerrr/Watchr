import NavBar from "../Layout/NavBar/NavBar";
import MovieDescription from "../Layout/MovieDescription/MovieDescription";
import MovieReviews from "../Layout/MovieReviews/MovieReviews";


function InMoviePage() {
  return (
    <div>
      <NavBar />
      <MovieDescription />
      <MovieReviews />
    </div>
  );
}

export default InMoviePage;