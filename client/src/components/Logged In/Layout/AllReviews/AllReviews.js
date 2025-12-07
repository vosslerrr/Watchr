import './allReviews.css'
import { getUserReviews, getMovieDetails, deleteUserReview, editUserReview } from '../../../../utils/api'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

function AllReviews(){
    const { username } = useParams();
    const currUser = localStorage.getItem("username");
    const [userReviews, setUserReviews] = useState([]);
    const [details, setDetails] = useState([]);
    const [editingMovieId, setEditingMovieId] = useState(null);
    const [reviewData, setReviewData] = useState({
            reviewPara: '',
            rating: '10'
        });
    const { reviewPara, rating } = reviewData;

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

    const onChange = e => setReviewData({ ...reviewData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
            e.preventDefault();
            
            await editUserReview(username, editingMovieId, reviewPara, rating);
    
            window.location.reload();
    };

    const deleteReview = async (movie_id) => {
        const confirmed = window.confirm("Are you sure?");

        if(!confirmed) return;

        await deleteUserReview(username, movie_id);

        window.location.reload();
    };

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
                                    <Link to={`/movie/${review.movie_id}`}>{details[index]?.title}</Link>
                                </span>

                                <div className="ARRatingRow">
                                    <span className="ARRating">{review.rating}</span>
                                    <img className="ARStar" src="/rating-star.png"></img>
                                </div>

                                <span className="ARReviewPara">"{review.reviewPara}"</span>

                                {username === currUser ? (
                                    <div className="edit-Review">
                                        <div id="URedit-delete">
                                            <img id="UReditIcon"src="/edit-icon.png" onClick={() => {
                                                setEditingMovieId(review.movie_id);
                                                setReviewData({
                                                    reviewPara: review.reviewPara,
                                                    rating: review.rating
                                                });
                                                }}>
                                            </img>
                                            <img id="URdeleteIcon" src="/delete-icon.png" onClick={() => deleteReview(review.movie_id)}>
                                            </img>
                                        </div>

                                        <div className={editingMovieId === review.movie_id ? "editReview-overlay-open" : "editReview-overlay"}>
                                            <form className="ERreviewContent" onSubmit={onSubmit}>
                                                <button type="button" className="ERexitButton" onClick={() => setEditingMovieId(null)}>x</button>
                                                
                                                <div className="ERHeader">
                                                    <span className="ERpopupTitle">You Watched: </span>
                                                    <span className="ERpopupMovieTitle">{details[index]?.title}</span>
                                                    <span className="ERpopupDate"> ({details[index]?.release_date.slice(0,4)})</span>
                                                    <hr></hr>
                                                </div>
                                                
                                                <div className="ERpopupBody">
                                                    <img className="ERpopupImage"src={`https://image.tmdb.org/t/p/w500${details[index]?.poster_path}`} />
                                                    <textarea 
                                                        className="ERreviewBox"
                                                        name="reviewPara"
                                                        placeholder={review.reviewPara} 
                                                        value={reviewPara ?? ""} 
                                                        onChange={onChange}>
                                                    </textarea>
                                                </div>
                                                
                                                <div className="ERratingRow">
                                                    <span className="ERratingLabel">Rating:</span>
                                                    <input 
                                                        type="number"
                                                        className="ERratingInput"
                                                        name="rating"
                                                        min="0.5"
                                                        max="10"
                                                        step="0.5"
                                                        value={rating}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                    <button className="ERsave-Review" type="submit">Watchd</button>
                                                </div>          
                                            </form>

                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default AllReviews;