import express from "express";
import Review from "../models/Review.js"
import User from "../models/User.js"

const router = express.Router();

router.get("/recent/:movie_id", async(req, res) => {
    const  { movie_id } = req.params;

    const reviews = await Review.find({ movie_id: movie_id }).sort({ createdAt: -1 });

    if(reviews == null){
        return res.json({ msg: "No movie reviews" });
    }

    res.send(reviews);
});

router.get("/friends/:username", async(req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    const followingIDs = user.following;

    if(followingIDs.length === 0){
        return res.json({ reviews: []});
    }

    const reviews = await Review.find({
        userID: { $in: followingIDs }
    })
    .sort({ createdAt: -1 });

    res.json(reviews);
})

export default router;