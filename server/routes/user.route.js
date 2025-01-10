import express from "express";
import { test } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/test", test); // this gets used in the index file and looks like this in the browser search (http://localhost:[port]/api/user/test)

export default router;