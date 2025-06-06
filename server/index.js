import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 6001, () => {
            console.log(`server is running on port ${process.env.PORT || 3001}`);
        })
    })
    .catch((error) => {
        console.log("error in database connection :", error)
    })