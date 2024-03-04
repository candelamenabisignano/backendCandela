import mongoose from "mongoose";
const usersCollection = "users";
const usersSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { required: true, type: Number },
  password: { required: true, type: String },
  role: { type: String, enum: ["admin", "user", "premium"], default: "user" },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "carts",
  },
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: String,
  status: {
    type: String,
    default: "incomplete",
    enum: ["complete", "incomplete"],
  },
});
usersSchema.pre("find findOne", () => {
  this.populate("cart");
});
export const usersModel = mongoose.model(usersCollection, usersSchema);
