import mongoose from "mongoose";

const usersCollection= 'users';

const usersSchema= new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{type:String, unique:true},
    age:Number,
    password:String,
    role:{type:String, enum: ['admin', 'user'], default:'user'},
    cart:{
        type:mongoose.Types.ObjectId,
        ref:'carts'
    }
});

usersSchema.pre('find findOne', ()=>{
    this.populate('cart')
})

export const usersModel= mongoose.model(usersCollection, usersSchema);