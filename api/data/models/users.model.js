const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: [true, "First name cannot be empty!"],
        trim: true
      },
      last: {
        type: String,
        required: [true, "Last name cannot be empty!"],
        trim: true
      }
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty!"],
      unique: true,
      lowercase: true
    },
    username: {
      type: String,
      required: [true, "Username cannot be empty!"]
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty!"]
    }
  },
  { timestamps: true }
);

mongoose.model("User", userSchema);
