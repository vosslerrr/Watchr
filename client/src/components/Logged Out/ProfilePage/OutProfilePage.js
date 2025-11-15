import NavBar from "../Layout/NavBar/NavBar";
import UserInfo from "../Layout/UserInfo/UserInfo";
import UserReviews from "../Layout/UserReviews/UserReviews";

function OutProfilePage() {
    return (
        <div>
            <NavBar />
            <UserInfo />
            <UserReviews />
        </div>
    );
}

export default OutProfilePage;