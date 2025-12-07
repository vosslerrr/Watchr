import express from "express";
import User from "../models/User.js";
import Review from "../models/Review.js";
import { put } from "@vercel/blob";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/details/:username", async(req, res) => {
    const { username } = req.params;

    let user = await User.findOne({ username });

    res.send(user);
});

router.get("/reviews/:username", async(req, res) => {
    const { username } = req.params;

    let reviews = await Review.find({ username }).sort({ createdAt: -1 });

    if(reviews == null){
        return res.json({ msg: "No user reviews" });
    }

    res.send(reviews);
});

router.get("/following/:username", async(req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate("following", "username");

    const followingUsernames = user.following.map(f => f.username);

    res.send(followingUsernames);
});

router.get("/followers/:username", async(req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate("followers", "username");

    const followerUsernames = user.followers.map(f => f.username);

    res.send(followerUsernames);
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

    return res.json({ success: true });
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
    
    return res.json({ success: true });
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

router.post("/uploadavatar/:username", upload.single("avatar"), async (req, res) => {
    const { username } = req.params;
    const file = req.file;

    const blob = await put(`avatars/${username}/${file.originalname}`, file.buffer, {
        access: "public",
        allowOverwrite: true
    });

    const finalUrl = `${blob.url}?v=${Date.now()}`;

    await User.updateOne(
        { username }, 
        { $set: { avatarURL: finalUrl } }
    );

    res.json({ success: true, url: finalUrl });
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

router.get("/search/:currentUser/:query", async (req, res) => {
    const { currentUser, query } = req.params;
    
    const user = await User.findOne({ username: currentUser });

    if (!user) return res.json([]);

    const users = await User.find({
        username: { $regex: query, $options: "i" },
        username: { $ne: currentUser }
    })
    .select("username avatarURL followers") 
    .limit(5);

    const results = users.map(u => ({
        username: u.username,
        avatarURL: u.avatarURL,
        isFollowing: u.followers.includes(user._id)
    }));

    res.json(results);
});

export default router;