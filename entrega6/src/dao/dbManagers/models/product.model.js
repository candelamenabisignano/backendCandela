import mongoose, { Schema } from 'mongoose';

const productCollection= 'products';

const productSchema= new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    code:{type:String, required:true, unique:true},
    price:{type:Number, required:true},
    status:{type:Boolean, required:true, default:true},
    stock:{type:Number, required:true},
    category:{type:String, required:true},
    thumbnail:{type:Array, default:[]}
});

export const productModel= mongoose.model(productCollection, productSchema);