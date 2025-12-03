import express from "express";
import User from "../models/User.js";
import Review from "../models/Review.js"

const router = express.Router();

router.get("/details/:username", async(req, res) => {
    const { username } = req.params;

    let user = await User.findOne({ username });

    res.send(user);
});

router.post("/unfollow/:follower/:target", async(req, res) => {
    const { follower, target } = req.params;

    const followerUser = await User.findOne({ username: follower });
    const targetUser = await User.findOne({ username: target });

    await User.updateOne(
        { _id: targetUser._id },
        { $pull: { followers: followerUser._id } }
    );

    await User.updateOne(
        { _id: followerUser._id },
        { $pull: { following: targetUser._id } }
    );
});

router.post("/follow/:follower/:target", async(req, res) => {
    const { follower, target } = req.params;

    const followerUser = await User.findOne({ username: follower });
    const targetUser = await User.findOne({ username: target });

    await User.updateOne(
        { _id: targetUser._id },
        { $addToSet: { followers: followerUser._id } }
    );

    await User.updateOne(
        { _id: followerUser._id },
        { $addToSet: { following: targetUser._id } }
    );
});

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

router.put("/updatereview/:username/:movie_id", async(req, res) => {
    const { username, movie_id } = req.params;
    const { reviewPara, rating } = req.body;

    await Review.findOneAndReplace(
        { username, movie_id },
        { reviewPara, rating },
        { new: true }
    );
});

router.delete("/deletereview/:username/:movie_id", async(req, res) => {
    const { username, movie_id } = req.params;

    await Review.findOneAndDelete(
        { username, movie_id }
    );
});

router.get("/search/:currentUser/:query", async (req, res) => {
    const { currentUser, query } = req.params;
    
    const user = await User.findOne({ username: currentUser });

    if (!user) return res.json([]);

    const users = await User.find({
        username: { $regex: query, $options: "i" },
        username: { $ne: currentUser }
    })
    .select("username avatar followers") 
    .limit(5);

    const results = users.map(u => ({
        username: u.username,
        avatar: u.avatar,
        isFollowing: u.followers.includes(user._id)
    }));

    res.json(results);
});

export default router;