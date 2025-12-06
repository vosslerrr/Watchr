import './friendReviews.css';
import { Link } from "react-router-dom";
import { getFriendReviews, getMovieDetails, getUserDetails } from '../../../../utils/EC2api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function FriendReviews(){
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [friends, setFriends] = useState([]);
    const [userAvatars, setUserAvatars] = useState([]);
    const [movieIds, setMovieIds] = useState([]);
    const [posters, setPosters] = useState([]);
    const [titles, setTitles] = useState([]);

    useEffect(() =>{
        async function loadReviews(){
            const res = await getFriendReviews(username);

            const tempFriends = res.map(review => review.username);
            const tempIds = res.map(review => review.movie_id);

            setFriends(tempFriends);
            setMovieIds(tempIds);
            setReviews(res);
        }

        loadReviews();
    }, []);

    useEffect(() => {
        async function loadAvatars(){
            const avatarPromises = friends.map(async (user) => {
                const res = await getUserDetails(user);
                return res.avatarURL;
            });
            
            const avatarArray = await Promise.all(avatarPromises);
            
            setUserAvatars(avatarArray);
        }

        loadAvatars();
    }, [friends]);

    useEffect(() => {
        async function loadPosters(){
            const posterPromises = movieIds.map(async (id) => {
                const res = await getMovieDetails(id);
                return res.poster_path;
            });

            const posterArray = await Promise.all(posterPromises);

            setPosters(posterArray);
        }

        async function loadTitles(){
            const titlePromises = movieIds.map(async (id) => {
                const res = await getMovieDetails(id);
                return res.original_title;
            });

            const titleArray = await Promise.all(titlePromises);

            setTitles(titleArray);
        }

        loadPosters();
        loadTitles();
    }, [movieIds]);

    const goToProfile = (username) => navigate(`/user/${username}`);
    
    return(
        <div className="FriendReviews">
            <div id="welcomeMessage">Welcome Back <Link to={`/user/${username}`}>{username}</Link></div>

            <h2 id="FRHeader">
                Recent Friend Reviews
            </h2>

            <div className="FRReviews">
                {reviews.length === 0 ? (
                    <div id="noFRReviews">No recent friend reviews.</div>
                ) : (
                    reviews.map((review, index) => (
                        <div className="FRWrapper">
                            <div className="FRUserLayout">
                                <img className="FRAvatar" src={userAvatars[index]} onClick={() => goToProfile(friends[index])}></img>
                                <span className="FRUsername" onClick={() => goToProfile(friends[index])}>{friends[index]}</span>
                            </div>

                            <div className="FRReviewLayout">
                                <div className="FRPoster">
                                    <Link to={`/movie/${review.movie_id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${posters[index]}`}></img>
                                    </Link>
                                </div>

                                <div className="FRReviewContent">
                                    <span className="FRMovieTitle">
                                        <Link to={`/movie/${review.movie_id}`}>{titles[index]}</Link>
                                    </span>

                                    <div className="FRRatingRow">
                                        <span className="FRRating">{review.rating}</span>
                                        <img className="FRStar" src="/rating-star.png"></img>
                                    </div>

                                    <span className="FRReviewPara">"{review.reviewPara}"</span>
                                </div>
                            </div>
                        </ div>
                        
                    )
                ))}
            </div>
        </div>
    );
}

export default FriendReviews;