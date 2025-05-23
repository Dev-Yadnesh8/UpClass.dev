import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MONGO DB CONNECTED !!\n HOST : ${connectionInstance.connections[0].host}\n NAME : ${connectionInstance.connections[0].name} `
    );
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILED !!", error);
    process.exit(1);
  }
};

export default connectToDB;
