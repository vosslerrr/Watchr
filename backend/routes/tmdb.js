import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/popular", async (req, res) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
  );

  const data = await response.json();
  console.log(data);
  res.json(data);
});

router.get("/upcoming", async (req, res) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en&region=US&sort_by=popularity.desc&with_release_type=2&primary_release_date.gte=2025-12-01&primary_release_date.lte=2026-02-01",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
  );

  const data = await response.json();
  res.json(data);
})

router.get("/:movie_id/details", async (req, res) => {
  const { movie_id } = req.params;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
  );

  const data = await response.json();
  res.json(data);
});

export default router;