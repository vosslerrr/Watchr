import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    movie_id: { type: String, required: true },
    review: String,
    rating: { type: String, min: 0, max: 10 }
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;