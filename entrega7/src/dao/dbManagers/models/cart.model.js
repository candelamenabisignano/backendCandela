import mongoose, { Schema } from 'mongoose';

const cartCollection= 'carts';

const cartSchema= new Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'products',
                unique:true
            },
            quantity:Number
        }
    ]
});

cartSchema.pre(["find", "findOne", "findById"], function(){
    this.populate('products.product');
});

export const cartModel= mongoose.model(cartCollection, cartSchema);