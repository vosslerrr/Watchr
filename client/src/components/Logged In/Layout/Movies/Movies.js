import React, { useState, useRef, useEffect } from "react";
import './movies.css';
import { getMovieDetails, getCredits } from '../../../../utils/api';
import { useParams } from "react-router-dom";
function Movies(){
    
    const {movieId}=useParams();
    const [movieTitle, setMovieTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [director, setDirector] = useState('');
    const [cast, setCast] = useState([]);
    const getCreditsRef = useRef(null);
    useEffect(() => {
        async function loadDetails(){
            const res = await getMovieDetails(movieId);
            
            setMovieTitle(res.original_title);
            setPoster(res.poster_path);
            setDetails(res.overview);
            setDate(res.release_date);
            /*setDirector(res.credits.crew);*/
            
        }
        async function loadCredits() {
            const res = await getCredits(movieId);

            setCast(res.cast);
        }
        loadCredits();
        loadDetails();
    }, []);

    return(
        <div className="moviePage">
            <div className="moviePoster">
                <img src={`https://image.tmdb.org/t/p/w500${poster}`}/>
            </div>
            <div className="movieInfo">
                <div className="titleRow">
                    <h1 className="movieTitle">{movieTitle}</h1>
                    <h3 className="movieDate">{date.slice(0,4)}</h3>
                
                </div>
                <h2 className="overviewRow">Overview</h2>
                <span>{details}</span>  
            
                <div className="castRow" ref={getCreditsRef}>
                    <h3>Cast</h3>
                    {cast.map((c, index) => (
                    <div id="cast1" key={c.id}>
                        {cast[index]?.profile_path?.[0] && (
                        <span><img src={`https://image.tmdb.org/t/p/w500${cast[index].profile_path}`}/>{cast[index].name}</span>
                        )}
                        
                    </div>
                    ))}        
                </div>
            </div>
        </div>


    );
}
export default Movies;