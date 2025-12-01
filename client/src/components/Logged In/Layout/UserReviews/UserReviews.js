import "./userReviews.css";
import { getUserReviews } from '../../../../utils/api' 
import { useParams } from "react-router";
import { useState, useEffect } from "react";

function UserReviews(){
    const { username } = useParams();
    const [userReviews, setUserReviews] = useState([]);
    const [movieID, setMovieID] = useState([]);

    useEffect(() => {
            async function load(){
                const res = await getUserReviews(username);
                
                if(res.msg == null){setUserReviews(res);}
            }
             
            load();
    }, []);

    return(
        <div className="UserReviews">
            <div className="Header">
                <span id="reviewHeader">Recent Reviews</span>
                <a id="seeAll" href="/">See All</a>
            </div>
            <div className="Reviews">
                {userReviews.map((review, index) => {
                    return(
                        review ? (
                            <div id="reviewLayout">
                                <div id="reviewPara">{review.reviewPara}</div>
                                <div id="rating">{review.rating}</div>
                            </div>
                        ) : null (
                            <div id="noReviews">You have no reviews</div>
                        )
                    );
                })}
            </div>
        </div>
    );
}

export default UserReviews;