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

    const user = await User.findOne({ username }).populate("following", "username");

    const followingUsernames = user.following.map(f => f.username);

    if(followingUsernames.length === 0){
        return res.json({ reviews: []});
    }

    const reviews = await Review.find({
        username: { $in: followingUsernames }
    })
    .sort({ createdAt: -1 })
    .limit(3);

    res.json(reviews);
})

export default router;