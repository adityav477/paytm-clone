import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware.js";
import { User, Account } from "../../db.js";
import zod from "zod";
import { stringify } from "postcss";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const account = await Account.findOne({ userId: userId });

  res.status(200).json({
    balance: account.balance,
  });
});

//zod schema for transfer
// const transferSchema = zod.object({
//   to: zod.string(),
//   amount: zod.number(),
// })

// router.post("/transfer", authMiddleware, async (req, res) => {
//   // try {
//   const session = await mongoose.startSession();
//   console.log("inside transfer");
//   session.startTransaction();
//   const { amount, to } = req.body;
//   console.log(amount, to);
//
//   // const { success } = transferSchema.safeParse(req.body);
//   // console.log(success);
//
//   // if (!success) {
//   //   await session.abortTransaction();
//   //   return res.status(400).json({
//   //     message: "Invalid Input",
//   //   })
//   // }
//
//   //finding with userId
//   const account = await Account.findOne({ userId: req.userId }).session(session);
//   console.log(account);
//
//   if (!account || account.balance < amount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: "Insufficient balance",
//     })
//   }
//
//   const receiverAccount = await Account.findOne({ userId: to }).session(session);
//
//   if (!receiverAccount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: "Receiver Account not found",
//     })
//   }
//
//   //doing transfer
//   const sender = await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//   const receiver = await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
//
//   await session.commitTransaction();
//   res.json({
//     message: "transfer successful",
//   })
//
//   // } catch (err) {
//   // res.status(400).json({
//   // message: "transcation Failed"
//   // })
//   // }
//
// })

//without mongoose.transcation
router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;
  console.log(amount, to);
  console.log("req.userId is " + req.userId);

  const userId = req.userId;
  console.log("userId is " + userId);
  const sender = await Account.findOne({ userId });

  const senderBalance = sender.balance;

  if (senderBalance < amount) {
    return res.status(400).json({
      message: "Insufficient Balance"
    })
  }

  const receiver = await Account.findOne({ userId: to });

  if (!receiver) {
    return res.status(400).json({
      message: "User not found"
    })
  }

  const updatedSender = await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      }
    })

  const updatedReceiver = await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      }
    }
  )

  console.log("sender is " + updatedSender);
  console.log("receiver is " + updatedReceiver);

  if (updatedReceiver && updatedSender) {
    return res.status(200).json({
      message: "Transaction Completed"
    })
  }
});
export default router;
