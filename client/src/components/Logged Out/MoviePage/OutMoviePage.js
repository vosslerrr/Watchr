import NavBar from "../Layout/NavBar/NavBar";
import MovieDescription from "../Layout/MovieDescription/MovieDescription";
import MovieReviews from "../Layout/MovieReviews/MovieReviews";
import Footer from '../../../components/Layout/Footer/Footer';
function OutMoviePage() {
  return (
    <div>
      <NavBar />
      <MovieDescription />
      <MovieReviews />
      <Footer />
    </div>
  );
}

export default OutMoviePage;