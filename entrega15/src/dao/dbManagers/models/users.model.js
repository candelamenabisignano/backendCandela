import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
  first_name: {type:String},
  last_name: {type:String},
  email: { type: String, required:true, unique:true},
  age: {required:true,type:Number},
  password: {required:true,type:String},
  role: { type: String, enum: ["admin", "user","premium"], default: "user" },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "carts",
  },
});

usersSchema.pre("find findOne", () => {
  this.populate("cart");
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
