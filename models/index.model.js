import mongoose from "mongoose";
import showCollection from "./show.model.js";
import userCollection from "./user.model.js";

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

const models = { showCollection, userCollection };

export { connectDb };
export default models;
