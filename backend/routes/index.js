// backend/routes/index.js
import express from "express";
import userRouter from "./user.js";
import accountRouter from "./account.js";
import { authMiddleware } from "../middleware.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.get("/", authMiddleware, (req, res) => {
  res.json({
    result: true
  })
})

export default router;
