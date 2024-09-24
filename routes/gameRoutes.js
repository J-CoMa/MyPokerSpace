import express from "express";
import { renderBlackjack } from "../controllers/gameControllers.js";

const router = express.Router();

router.get("/blackjack", renderBlackjack);

export default router;