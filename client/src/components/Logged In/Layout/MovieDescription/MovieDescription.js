import React, { useState, useRef, useEffect } from "react";
import './movieDescription.css';
import { getMovieDetails, getMovieCredits, postUserReview } from '../../../../utils/api';
import { useParams } from "react-router-dom";


function MovieDescription() {

    const { movieId } = useParams();
    const [movieTitle, setMovieTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [director, setDirector] = useState('');
    const [cast, setCast] = useState([]);
    const getCreditsRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const username = localStorage.getItem("username");

    const [reviewData, setReviewData] = useState({
            reviewPara: '',
            rating: '10'
        });
    const { reviewPara, rating } = reviewData;
    const onChange = e => setReviewData({ ...reviewData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        await postUserReview(username, movieId, reviewPara, rating);

        setReviewData({
            reviewPara:"",
            rating:"10"
        });
        
    };

    useEffect(() => {
        async function loadDetails() {
            const res = await getMovieDetails(movieId);

            setMovieTitle(res.original_title);
            setPoster(res.poster_path);
            setDetails(res.overview);
            setDate(res.release_date);
        }

        async function loadCredits() {
            const res = await getMovieCredits(movieId);

            setCast(res.cast);
            const directorData = res.crew.find(p => p.job === "Director");
            setDirector(directorData?.name || "Not Listed");
        }

        loadCredits();
        loadDetails();
    }, []);

    const scrollLeft = () => {
        const row = getCreditsRef.current;
        row.scrollLeft = Math.max(row.scrollLeft - row.clientWidth, 0);
    };

    const scrollRight = () => {
        const row = getCreditsRef.current;
        const maxScroll = row.scrollWidth - row.clientWidth;
        row.scrollLeft = Math.min(row.scrollLeft + row.clientWidth, maxScroll);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setReviewData({
            reviewPara: "",
            rating: "10"
        });
    };

    return (
        <div className="movieWrapper">
            <div className="moviePage">
                <div className="moviePoster">
                    <img id="movieImage" src={`https://image.tmdb.org/t/p/w500${poster}`} />
                </div>

                <div className="movieInfo">
                    <div className="titleRow">
                        <h1 className="movieTitle">{movieTitle}</h1>
                        <h3 className="movieDate">{date.slice(0, 4)}</h3>
                    </div>
                    <a>Directed by {director}</a>
                    <h2 className="overviewRow">Overview</h2>
                
                    <div className="userReviewWrapper">
                        <a href ="#" id="review-Button"onClick={() => setPopupOpen(true)}>Rate/Review</a>
                        <div className={popupOpen ? "review-Overlay open" : "review-Overlay"}>
                            <button
                            type="button"
                            id="exitButton"
                            onClick={closePopup}
                            >
                                x    
                            </button>
                            <form className="reviewConent">
                                <span className="popupTitle">You Watched: </span>
                                <span className="popupMovieTitle">{movieTitle}</span>
                                <span className="popupDate"> ({date.slice(0,4)})</span>
                                <hr></hr>
                                <img id="popupImage"src={`https://image.tmdb.org/t/p/w500${poster}`} />
                                <textarea 
                                    id="reviewBox"
                                    name="reviewPara"
                                    placeholder="Add A Review" 
                                    value={reviewPara} 
                                    onChange={onChange}>
                                </textarea>
                                <span id="ratingLabel">Rating:</span>
                                    <input 
                                        type="number"
                                        id="ratingInput"
                                        name="rating"
                                        min="0.5"
                                        max="10"
                                        step="0.5"
                                        value={rating}
                                        onChange={onChange}
                                        required
                                    />
                                <button 
                                    id="save-Review" 
                                    type="submit">
                                        Watchd
                                    </button>
                            </form>
                            
                        </div>
                    </div>

                    <span id="movieDetails">{details}</span>

                    <div className="castRowWrapper">
                        <button className="castLeft" onClick={scrollLeft}>
                            <img src="/left-arrow.png" />
                        </button>

                        <div className="castRow" ref={getCreditsRef}>
                            <span id="castSpan">Cast</span>

                            {cast.map((c, index) => {
                                const profile = cast[index]?.profile_path;
                                return (
                                    profile ? (
                                        <div id="cast1" key={c.id}>
                                                <img src={`https://image.tmdb.org/t/p/w500${profile}`} />
                                                <span id="castName">{c.name}</span>
                                                <span id="castMovieName">{c.character}</span>
                                        </div>
                                    ) : null
                                );
                            })}
                        </div>

                        <button className="castRight" onClick={scrollRight}>
                            <img src="/right-arrow.png" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDescription;