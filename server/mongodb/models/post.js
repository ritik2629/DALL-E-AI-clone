import mongoose from "mongoose";

const post = new mongoose.Schema({
  name: { type: String, required: true },
  propmt: { type: String, required: true },
  photo: { type: String, required: true },
});

export const postSchema = mongoose.model('post',post)