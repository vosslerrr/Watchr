import './friendReviews.css';
import { Link } from "react-router-dom";
import { getFriendReviews } from '../../../../utils/api';

function FriendReviews(){
    const username = localStorage.getItem("username");
    
    return(
        <div className="friendReviews">
            <div id="welcomeMessage">Welcome Back <Link to={`/user/${username}`}>{username}</Link></div>
        </div>
    );
}

export default FriendReviews;