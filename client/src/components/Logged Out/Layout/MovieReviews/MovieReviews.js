import React, { useState, useRef, useEffect } from "react";
import './movieReviews.css';
import { getMovieReviews, getUserDetails } from '../../../../utils/EC2api'
import { useParams } from "react-router-dom";

function MovieReviews(){
    const { movieId } = useParams();
    const[reviews, setReviews] = useState([]);
    const[usernames, setUsernames] = useState([]);
    const[userAvatars, setUserAvatars] = useState([]);

    useEffect(() => {
        async function loadReviews(){
            const res = await getMovieReviews(movieId);

            const temp = res.map(review => review.username);

            setUsernames(temp);
            setReviews(res);
        }

        loadReviews();
    }, [movieId]);

    useEffect(() => {
        async function loadAvatars() { 
            
            const avatarPromises = usernames.map(async (user) => {
                const res = await getUserDetails(user);
                return res.avatarURL;
            });

            const avatarArray = await Promise.all(avatarPromises);

            setUserAvatars(avatarArray);
        }

        loadAvatars();
    }, [usernames])

    return(
        <div className="MovieReviews">
            <h2 id="recentHeader">Recent Reviews</h2>

            <div className="recentReviews">
            {reviews.length === 0 ? (
                <div id="noReviews">No recent reviews</div>
            ) : (
                reviews.slice(0, 12).map((review, index) =>(
                    <div id="recentReviewLayout">
                        <div id="reviewUser">
                            <img id="outreviewAvatar" src={userAvatars[index]}></img>
                            <span id="outreviewUsername">{review.username}</span>
                            <span id="reviewRating">{review.rating}</span>
                            <img id="reviewStar" src="/rating-star.png"></img>
                        </div>

                        <div id="recentPara">"{review.reviewPara}"</div>
                    </div>
                )
            ))}
            </div>
        </div>
    );
}

export default MovieReviews;