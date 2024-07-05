import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getSearch } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", protectRoute, getSearch);

export default router;
