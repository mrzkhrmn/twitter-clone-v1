import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createTweet } from "../controllers/tweetController";

const router = express.Router();

router.post("/", authenticate, createTweet);

export default router;
