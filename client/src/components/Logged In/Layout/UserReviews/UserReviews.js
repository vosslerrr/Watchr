import "./userReviews.css";
import { getUserReviews, getMovieDetails } from '../../../../utils/api' 
import { useParams } from "react-router";
import { useState, useEffect } from "react";

function UserReviews(){
    const { username } = useParams();
    const [userReviews, setUserReviews] = useState([]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
            async function load(){
                const res = await getUserReviews(username);
                
                if(res.msg == null){setUserReviews(res);}
            }
             
            load();
    }, []);

    useEffect(() => {
        if(userReviews != null){
            Promise.all(
                userReviews.map(review => getMovieDetails(review.movie_id))
            )
                .then(allIDs => setDetails(allIDs));
        }
    }, [userReviews]);

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
                                <div id="poster"><img src={`https://image.tmdb.org/t/p/w500${details[index]?.poster_path}`}></img></div>
                                <div id="reviewContent">
                                    <span id="movieTitle">{details[index]?.original_title} ({details[index]?.release_date.slice(0,4)})</span>
                                    <span id="reviewPara">{review.reviewPara}</span>
                                    <span id="rating">{review.rating}</span>
                                </div>
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