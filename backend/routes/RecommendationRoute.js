import express from "express";
import { getAIRecommendations } from "../controllers/RecommendationController.js";
import authUser from "../middleware/auth.js";

const recommendationRouter = express.Router();

// POST /api/recommendations/ai
// Protected — requires user token
recommendationRouter.post("/ai", authUser, getAIRecommendations);

export default recommendationRouter;