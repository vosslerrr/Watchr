import NavBar from "../Layout/NavBar/NavBar";
import MovieDescription from "../Layout/MovieDescription/MovieDescription";
import Footer from "../../../components/Layout/Footer/Footer";
import MovieReviews from "../Layout/MovieReviews/MovieReviews";


function InMoviePage() {
  return (
    <div>
      <NavBar />
      <MovieDescription />
      <MovieReviews />
      <Footer />
    </div>
  );
}

export default InMoviePage;