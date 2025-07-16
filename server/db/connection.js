import mongoose from "mongoose";
import { DATABASE_NAME } from "../constant.js";

async function connectDB() {
    try {
        const connectionINstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DATABASE_NAME}`)
        console.log(`MongoDB connected: ${connectionINstance.connection.host}`);
    }
    catch (error) {
        console.log("error in database connection :",error);
        process.exit(1);
    }
}

export default connectDB;