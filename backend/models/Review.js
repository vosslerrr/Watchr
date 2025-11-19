import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    username: { type: String, index: true, required: true },
    movie_id: { type: Number, index: true, required: true },
    reviewPara: String,
    rating: { type: Number, min: 0, max: 10, required: true }
}, { timestamps: true });

ReviewSchema.index({ username: 1, movie_id: 1 }, { unique: true });

const Review = mongoose.model("Review", ReviewSchema);

export default Review;