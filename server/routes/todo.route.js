import express from "express";
import { test } from "../controllers/user.controllers.js";
import { createTodo, getTodos } from "../controllers/todo.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.get("/test", test)
router.post("/create", verifyToken, createTodo);
router.get("/gettodos", getTodos);

export default router;