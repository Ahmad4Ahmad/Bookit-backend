import express from "express";
import { updateUser, deleteUser, getUser, getAllUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/checkauthentication", verifyToken, (req, res, next) =>
{
    res.send("You are logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) =>
{
    res.send("You are logged in");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) =>
{
    res.send("Hello admin");
});

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

export default router;