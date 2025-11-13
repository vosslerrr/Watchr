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
    const res = await fetch(`${VERCEL_API}/routes/tmdb/${movie_id}/details`);
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