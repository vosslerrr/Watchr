import express from "express";
import User from "../models/User.js";
import Review from "../models/Review.js";
import { put } from "@vercel/blob";

const router = express.Router();

router.get("/details/:username", async(req, res) => {
    const { username } = req.params;

    let user = await User.findOne({ username });

    res.send(user);
});

router.get("/reviews/:username", async(req, res) => {
    const { username } = req.params;

    let reviews = await Review.find({ username });

    if(reviews == null){
        return res.json({ msg: "No user reviews" });
    }

    res.send(reviews);
});

router.put("/unfollow/:follower/:target", async(req, res) => {
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

router.put("/follow/:follower/:target", async(req, res) => {
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

router.put("/updatereview/:username/:movie_id", async(req, res) => {
    const { username, movie_id } = req.params;
    const { reviewPara, rating } = req.body;

    await Review.findOneAndUpdate(
        { username, movie_id },
        { $set: { reviewPara: reviewPara, rating: rating } },
        { new: true }
    );
});

router.put("/updateusername/:username/:newusername", async(req, res) => {
    const { username, newusername } = req.params;

    const existingUsername = await User.findOne({ newusername });

    if(existingUsername){
        return res.json({ msg: "Username taken." });
    }

    await User.findOneAndUpdate(
        { username },
        { $set: { username: newusername } },
        { new: true }
    );

    await Review.updateMany(
        { username: username },
        { $set: { username: newusername }}
    );

    return res.json({ success: true });
});

router.post("/uploadavatar/:username", async(req, res) => {
    const { username } = req.params;
    const file = req.file.avatar;

    const blob = await put(`avatars/${username}`, file.data, {
        access: "public"
    });

    await User.updateOne(
        { username },
        { $set: { avatarURL: blob.url }}
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

router.delete("/deletereview/:username/:movie_id", async(req, res) => {
    const { username, movie_id } = req.params;

    await Review.findOneAndDelete(
        { username, movie_id }
    );
});

export default router;