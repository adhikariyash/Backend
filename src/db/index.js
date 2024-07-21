import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\n mongo connectd! DB host: ${dbConnect.connection.host} `);
  } catch (error) {
    console.log("mongodb connection erro ", error);
    process.exit(1);
  }
};
export default connectDB
