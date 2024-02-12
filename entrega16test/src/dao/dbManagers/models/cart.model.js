import mongoose, { Schema } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

cartSchema.pre(["find", "findOne", "findById"], function () {
  this.populate("products.product");
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
