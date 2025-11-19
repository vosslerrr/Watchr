export async function getPopularMovies() {
    const res = await fetch("http://localhost:5000/routes/tmdb/popular");
    return res.json();
}

export async function getUpcomingMovies() {
    const res = await fetch("http://localhost:5000/routes/tmdb/upcoming");
    return res.json();
}

export async function getMovieDetails(movie_id){
    const res = await fetch(`http://localhost:5000/routes/tmdb/${movie_id}/details`);
    return res.json();
}

export async function getCredits(movie_id) {
    const res = await fetch(`http://localhost:5000/routes/tmdb/${movie_id}/credits`);
    return res.json();
}

export async function logInUser(username, password){
    const res = await fetch("http://localhost:5000/routes/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function registerUser(username, password){
    const res = await fetch("http://localhost:5000/routes/auth/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function postUserReview(username, movie_id, reviewPara, rating){
    const res = await fetch(`http://localhost:5000/routes/user/newreview/${username}/${movie_id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewPara, rating })
    });
    return res.json();
}