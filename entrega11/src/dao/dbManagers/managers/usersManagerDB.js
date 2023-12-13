import { usersModel } from "../models/users.model.js";

export default class UsersManager{
    constructor(){
        console.log('running users from db')
    }

    getAll=async()=>{
        const users= await usersModel.find({}).lean();
        return users;
    }

    get= async(email)=>{
        const user= await usersModel.findOne({email:email}).lean()
        return user;
    };

    register=async(user)=>{
        const newUser=await usersModel.create({...user});
        return newUser;
    };
}; 