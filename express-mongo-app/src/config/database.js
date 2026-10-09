import mongoose from "mongoose";
import { mongoUri } from "./env.js";

async function connectDatabase() {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
}

export default connectDatabase;
