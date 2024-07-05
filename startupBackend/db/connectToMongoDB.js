import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  // Load environment variables from .env file

const connectToMongoDB = async () => {
  const mongoUri = process.env.MONGO_DB_URI;

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
