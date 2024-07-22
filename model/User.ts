import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name is required"],
    },
    password: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    provider: {
      type: String,
      required: [true, "Provider is required"],
      enum: ["google", "userpassword"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      // trim: true,
      default: "",

    },
    country: {
      type: String,
      // trim: true,
      default: "",
    },
    address: {
      type: String,
      // trim: true,
      default: "",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Adding an index to the email field for faster queries
userSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
