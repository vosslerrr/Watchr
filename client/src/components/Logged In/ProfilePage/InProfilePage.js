import NavBar from "../Layout/NavBar/NavBar";
import UserInfo from "../Layout/UserInfo/UserInfo";
import UserReviews from "../Layout/UserReviews/UserReviews";
import Footer from '../../../components/Layout/Footer/Footer';
function InProfilePage() {
  return (
    <div>
      <NavBar />
      <UserInfo />
      <UserReviews />
      <Footer />
    </div>
  );
}

export default InProfilePage;