import NavBar from "../layout/NavBar/NavBar";
import UserInfo from "../layout/UserInfo/UserInfo";
import UserReviews from "../layout/UserReviews/UserReviews";

function ProfilePage() {
  return (
    <div>
      <NavBar />
      <UserInfo />
      <UserReviews />
    </div>
  );
}

export default ProfilePage;