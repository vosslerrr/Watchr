import './allReviews.css'
import { getUserReviews, getMovieDetails } from '../../../../utils/EC2api'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

function AllReviews(){
    const { username } = useParams();
    const currUser = localStorage.getItem("username");
    const [userReviews, setUserReviews] = useState([]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
            async function load(){
                const res = await getUserReviews(username);
                
                setUserReviews(res);
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
        <div className="AllReviews">
            <h2 id="ARHeader">Recent Reviews</h2>

            <div className="ARReviews">
                {userReviews.length === 0 ? (
                    username === currUser ? (
                        <div id="ARNoReviews">You have no reviews</div>
                    ) : (
                        <div id="ARNoReviews">This user has no reviews</div>
                    )
                ) : (
                    userReviews.map((review, index) => (
                        <div className="ARReviewLayout">
                            <div className="ARPoster">
                                <Link to={`/movie/${review.movie_id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${details[index]?.poster_path}`}></img>
                                </Link>
                            </div>
                            
                            <div className="ARReviewContent">
                                <span className="ARMovieTitle">
                                    <Link to={`/movie/${review.movie_id}`}>{details[index]?.original_title}</Link>
                                </span>

                                <div className="ARRatingRow">
                                    <span className="ARRating">{review.rating}</span>
                                    <img className="ARStar" src="/rating-star.png"></img>
                                </div>

                                <span className="ARReviewPara">"{review.reviewPara}"</span>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default AllReviews;