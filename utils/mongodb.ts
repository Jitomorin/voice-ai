import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://admin:admin@ecom.ugzmdhc.mongodb.net/?retryWrites=true&w=majority&appName=ecom";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
} else {
  console.log("MONGODB_URI:", MONGODB_URI);
}

async function dbConnect() {
  if (MONGODB_URI) {
    if (mongoose.connection.readyState !== 1) {
      try {
        await mongoose.connect(MONGODB_URI, {
          dbName: "voiceapp",
        });
        console.log("*** MongoDB Connected ***");
      } catch (error) {
        console.log("--- MongoDB Connection Error ---", error);
      }
    } else {
      console.log("MongoDB already connected");
    }
  } else {
    console.log("->-> -> MONGODB_URI is not defined");
  }
}

export default dbConnect;
