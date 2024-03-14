import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.DBURL);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 30,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  accounts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

//Accounts
const accountsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountsSchema);

export { User, Account };
