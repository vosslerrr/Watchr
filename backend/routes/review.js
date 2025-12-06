import express from "express";
import Review from "../models/Review.js"

const router = express.Router();

router.get("/recent/:movie_id", async(req, res) => {
    const  { movie_id } = req.params;

    const reviews = await Review.find({ movie_id: movie_id });

    if(reviews == null){
        return res.json({ msg: "No movie reviews" });
    }

    res.send(reviews);
});

export default router;