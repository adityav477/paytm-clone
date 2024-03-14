import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { User, Account } from "../../db.js";
import { authMiddleware } from "../middleware.js";

const router = express.Router();

//zod schema
const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(6),
})

//jwt Secret 
const jwtSecret = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  // console.log(req.body);
  const response = signupSchema.safeParse(req.body);
  // console.log(response);
  if (!response.success) {
    return res.status(411).json({
      message: "Invalid input",
    })
  }


  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) {
    res.status(411).json({
      message: "User already exists"
    })
  } else {
    const user = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    })

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000
    })


    const token = jwt.sign({ userId }, jwtSecret);

    res.json({
      message: "User Created successfully ",
      token: token
    })
  }
})

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Invalid Input"
    })
  }

  const userExists = await User.findOne({
    username: req.body.username,
    password: req.body.password
  }
  );

  if (userExists) {
    const userId = userExists._id.toString();

    console.log(userId);
    const token = jwt.sign(userId, jwtSecret);

    res.status(200).json({
      message: "Logged In",
      token: token,
    })

  } else {
    res.status(411).json({
      message: "Error while loggin in"
    })
  }
})


//8-b
router.get("/bulk", async (req, res) => {
  const name = req.query.filter;
  // console.log(name);

  User.find().or([{ firstName: { $regex: name } }, { lastName: { $regex: name } }]).then((users) => {
    res.json({
      users: users,
    })
  }).catch(err => {
    res.json({ error: err });
  })

})

// const updateUserSchema = zod.object({
//   password: zod.string(),
//   firstName: zod.string(),
//   lastName: zod.string()
// })

//8-a
router.put("/", authMiddleware, async (req, res) => {

  // const { success } = updateUserSchema.safeParse(req.body);
  // console.log(updateUserSchema.safeParse(req.body));
  //
  // console.log(success);
  // if (!success) {
  //   res.status(411).json({
  //     message: "Can't update wrong inputs"
  //   })
  // } else {

  const updatedUser = await User.findByIdAndUpdate(req.userId, {
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }, { new: true })
  console.log("udated user " + updatedUser);

  res.status(200).json({
    message: "User updated successfully",
  })
}

  // }
)

export default router;
