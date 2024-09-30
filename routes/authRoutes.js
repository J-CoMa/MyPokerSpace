import express from 'express';
import { renderHome, handleGoogleAuth } from "../controllers/authControllers.js";
const router = express.Router();

router.get("/", renderHome);
router.get("/auth/google", handleGoogleAuth);

export default router;