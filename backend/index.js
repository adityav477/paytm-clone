import "dotenv/config.js";
import express from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`paytm is up on port ${port}`);
})
