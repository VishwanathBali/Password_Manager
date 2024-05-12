import mongoose from "mongoose";

const passSchema = mongoose.Schema(
  {
    site: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const pass = mongoose.model('pass',passSchema)
