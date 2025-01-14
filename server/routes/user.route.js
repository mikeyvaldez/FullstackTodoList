import express from "express";
import { deleteUser, signout, test, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();

router.get("/test", test); // this gets used in the index file and looks like this in the browser search (http://localhost:[port]/api/user/test)
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
export default router;