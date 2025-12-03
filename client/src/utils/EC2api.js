const VERCEL_API = process.env.REACT_APP_API_URL;

export async function getPopularMovies() {
    const res = await fetch(`${VERCEL_API}/routes/tmdb/popular`);
    return res.json();
}

export async function getUpcomingMovies() {
    const res = await fetch(`${VERCEL_API}/routes/tmdb/upcoming`);
    return res.json();
}

export async function getMovieDetails(movie_id){
    const res = await fetch(`${VERCEL_API}/routes/tmdb/details/${movie_id}`);
    return res.json();
}

export async function getMovieCredits(movie_id){
    const res = await fetch(`${VERCEL_API}/routes/tmdb/credits/${movie_id}`);
    return res.json();
}

export async function logInUser(username, password){
    const res = await fetch(`${VERCEL_API}/routes/auth/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function registerUser(username, password){
    const res = await fetch(`${VERCEL_API}/routes/auth/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function getUserDetails(username){
    const res = await fetch(`${VERCEL_API}/routes/user/details/${username}`);
    return res.json();
}

export async function postUserReview(username, movie_id, reviewPara, rating){
    const res = await fetch(`${VERCEL_API}/routes/user/newreview/${username}/${movie_id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewPara, rating })
    });
    return res.json();
}

export async function getUserReviews(username){
    const res = await fetch(`${VERCEL_API}/routes/user/reviews/${username}`);
    return res.json();
}

export async function putNewUsername(username, newusername){
    const res = await fetch(`${VERCEL_API}/routes/user/updateusername/${username}/${newusername}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newusername })
    });
    return res.json();
}