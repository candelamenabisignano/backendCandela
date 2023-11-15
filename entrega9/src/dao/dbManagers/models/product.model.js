import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection= 'products';

const productSchema= new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    code:{type:String, required:true, unique:true},
    price:{type:Number, required:true},
    status:{type:Boolean, required:true, default:true},
    stock:{type:Number, required:true},
    category:{type:String, required:true},
    thumbnail:{type:Array, default:[]},
    availability:{type:Boolean, default:true}
});

productSchema.plugin(mongoosePaginate);

export const productModel= mongoose.model(productCollection, productSchema);