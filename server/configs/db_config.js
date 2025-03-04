import mongoose from "mongoose";
import keys from "./server_config.js";
async function connectToDb() {
  try {
    if (keys.NODE_ENV == "development") {
      await mongoose.connect(keys.DB);
      console.log("Mongo running");
    } else {
      console.log("we are not ready with the other url");
    }
  } catch (error) {
    console.log("unable to connect to MONGO", error);
  }
}
export default connectToDb;