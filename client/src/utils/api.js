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