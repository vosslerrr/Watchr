import "./userReviews.css";
import { getUserReviews, getMovieDetails } from '../../../../utils/api' 
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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
                {userReviews.slice(0, 3).map((review, index) => {
                    return(
                        review ? (
                            <div id="reviewLayout">
                                <div id="poster">
                                    <Link to={`/movie/${review.movie_id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${details[index]?.poster_path}`}></img>
                                    </Link>
                                </div>

                                <div id="reviewContent">
                                    <span id="movieTitle">
                                        <Link to={`/movie/${review.movie_id}`}>{details[index]?.original_title}</Link>
                                    </span>
                                    
                                    <div id="ratingRow">
                                        <span id="rating">{review.rating}</span>
                                        <img id="star" src="/rating-star.png"></img>
                                    </div>

                                    <span id="reviewPara">"{review.reviewPara}"</span>
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