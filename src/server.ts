import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

const port = 8081;
console.log(port);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
