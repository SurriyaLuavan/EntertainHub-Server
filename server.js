import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./models/index.model.js";
import serverless from "serverless-http";

import collectionRouter from "./routes/collection.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
const port = process.env.PORT ?? 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);

app.use("/api", collectionRouter);
app.use("/users", userRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port: ${port}...`);
    });
  })
  .catch((err) => console.error(err));

export const handler = serverless(app);
