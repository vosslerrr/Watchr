import React, { useState, useRef, useEffect } from "react";
import './movieReviews.css';
import { getMovieReviews, getUserDetails } from '../../../../utils/api'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

function MovieReviews(){
    const { movieId } = useParams();
    const navigate = useNavigate();
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

    const goToProfile = (username) => navigate(`/user/${username}`)


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
                            <img id="reviewAvatar" src={userAvatars[index]} onClick={() => goToProfile(review.username)}></img>
                            <span id="reviewUsername" onClick={() => goToProfile(review.username)}>{review.username}</span>
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