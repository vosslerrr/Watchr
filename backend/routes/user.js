import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/:username/details", async(req, res) => {
    const { username } = req.params;

    let user = await User.findOne({ username });

    res.send(user);
});

export default router;