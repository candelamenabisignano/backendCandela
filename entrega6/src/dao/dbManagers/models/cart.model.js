import mongoose, { Schema } from 'mongoose';

const cartCollection= 'carts';

const cartSchema= new Schema({
    products:{type:Array, default:[], required:true},
});

export const cartModel= mongoose.model(cartCollection, cartSchema);