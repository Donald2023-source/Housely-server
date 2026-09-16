import mongoose from "mongoose";
import config from "./constants.ts";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log(
      `Mongo DB connected to ${mongoose.connection.db?.databaseName}`,
    );
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
