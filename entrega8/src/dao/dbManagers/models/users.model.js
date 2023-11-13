import mongoose from "mongoose";

const usersCollection= 'users';

const usersSchema= new mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    age:{type:Number, required:true},
    password:{type:String, required:true},
    role:{type:String, enum: ['admin', 'user']}
});

export const usersModel= mongoose.model(usersCollection, usersSchema);