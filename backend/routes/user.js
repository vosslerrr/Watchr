import express from "express";
import User from "../models/User.js";
import Review from "../models/Review.js"

const router = express.Router();

router.get("/details/:username", async(req, res) => {
    const { username } = req.params;

    let user = await User.findOne({ username });

    res.send(user);
});

router.post("follow/:follower/:target", async(req, res) => {
    const { follower, target } = req.params;

    const follower_id = await User.findOne({ username: follower });
    const target_id = await User.findOne({ username: target });

    await User.updateOne(
        { username: target_id._id },
        { $addToSet: { followers: follower_id._id } }
    );

    await User.updateOne(
        { username: follower_id._id },
        { $addToSet: { following: target_id._id } }
    );
})

router.post("/newreview/:username/:movie_id", async(req, res) => {
    const { username, movie_id } = req.params;
    const { reviewPara, rating } = req.body;

    const existingReview = await Review.findOne({ username, movie_id });

    if(existingReview)
    {
        return res.json({ msg: `Movie has already been reviewed by ${username}` });
    }

    const review = new Review({
        username,
        movie_id,
        reviewPara,
        rating
    });

    await review.save();
});

export default router;