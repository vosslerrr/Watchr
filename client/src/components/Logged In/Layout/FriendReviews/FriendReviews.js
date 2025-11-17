import './friendReviews.css';
import { Link } from "react-router-dom";

function FriendReviews(){
    const username = localStorage.getItem("username");

    return(
        <div className="welcomeHeader">
            <span id="welcomeMessage">Welcome Back <Link to={`/${username}`}>{username}</Link></span>
        </div>
    );
}

export default FriendReviews;