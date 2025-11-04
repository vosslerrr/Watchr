import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/popular", async (req, res) => {
  const response = axios.get(
    "https://api.themoviedb.org/3/movie/popular",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
  );

  const data = (await response).data;
  res.json(data);
});

router.get("/upcoming", async (req, res) => {
  const response = axios.get(
    "https://api.themoviedb.org/3/movie/upcoming",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
  );

  const data = (await response).data;
  res.json(data);
})

router.get("/:movie_id/details", async (req, res) => {
  const { movie_id } = req.params;
  const response = axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    {
      params: {
        language: "en-US"
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
  );

  const data = (await response).data;
  res.json(data);
});

export default router;