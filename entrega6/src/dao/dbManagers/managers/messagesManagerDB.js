import { messageModel } from "../models/message.model.js";

export default class messagesDB{
    constructor(){
        console.log('working messages from DB')
    };

    get=async()=>{
        const messages= await messageModel.find().lean();
        return messages;
    };


    add= async(message)=>{
        const messageRes= await messageModel.create(message);
        return messageRes;
    };
};