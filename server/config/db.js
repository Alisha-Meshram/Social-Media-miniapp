import mongoose from "mongoose";

async function connectDB() {
  try {

    await mongoose.connect(
      "mongodb+srv://aalishameshram15_db_user:zgTpxgq6U7UqAQE7@cluster0.08fgbl6.mongodb.net/"
    );
   
    
    console.log("Database connected successfully");

  } catch (error) {
    console.log(error);
  }
}

export default connectDB;