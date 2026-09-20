import express from "express";
import { rateLimiter } from "../../core/rate-limiting.ts";
import {
  getProperties,
  getProperty,
  searchProperties,
} from "./properties.controller.ts";
import { authMiddleWare } from "../../middlewares/auth.ts";
// import {getProperties} from "./properties.controller.ts";

const router = express.Router();

router.post("/search", rateLimiter, authMiddleWare, searchProperties);
router.get("/", rateLimiter, authMiddleWare, getProperties);
router.get("/:id", rateLimiter, authMiddleWare, getProperty);

export default router;
