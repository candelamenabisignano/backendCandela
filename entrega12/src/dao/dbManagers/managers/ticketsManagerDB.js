import {ticketsModel} from "../models/tickets.model.js";

export default class TicketsDB{
    constructor(){

    };

    getAll=async()=>{
        const tickets= await ticketsModel.find({}).lean();
        return tickets;
    };

    getOne=async(code)=>{
        const ticket=await ticketsModel.findOne({code:code});
        return ticket;
    };

    create=async(user,ticket)=>{
        const newTicket= await ticketsModel.create(ticket);
        return newTicket
    };

    uptade=async(code,ticket)=>{
        const newTicket=await ticketsModel.findOneAndUpdate({code:code},ticket);
        return newTicket;
    };

    delete=async(code)=>{
        const ticket= await ticketsModel.findOneAndDelete({code:code});
        return ticket
    };
}