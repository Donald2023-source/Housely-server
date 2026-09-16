import express from "express";
import health from "./health.controller.ts";

const router = express.Router();
router.get("/health", health);

export default router;
