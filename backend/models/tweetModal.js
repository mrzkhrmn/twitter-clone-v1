import mongoose from "mongoose";

const tweetSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: { type: String, required: true, max: 300 },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
