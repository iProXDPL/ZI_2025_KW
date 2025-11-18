import mongoose from "mongoose";

const connectDB = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Połączono z MongoDB");
  } catch (error) {
    console.error("❌ Błąd połączenia z MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
