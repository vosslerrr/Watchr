import "./userReviews.css";
import { getUserReviews } from '../../../../utils/api' 
import { useParams } from "react-router";
import { useState, useEffect } from "react";

function UserReviews(){
    const { username } = useParams();
    const [userReviews, setUserReviews] = useState('');

    useEffect(() => {
            async function load(){
                //const res = await getUserReviews(username);
    
            }
            
            load();
    }, []);

    return(
        <div className="UserReviews">
            <div className="Header">
                <span id="reviewHeader">Recent Reviews</span>
                <a id="seeAll" href="/">See All</a>
            </div>
        </div>
    );
}

export default UserReviews;