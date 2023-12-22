export default class TicketsRepository{
    constructor(dao){
        this.dao=dao;
    };
    getAllRepository=async()=>{
        const tickets= await this.dao.getAll();
        return tickets
    };

    getOneRepository=async(code)=>{
        const ticket= await this.dao.getOne(code);
        return ticket;
    };

    addRepository=async(user,amount)=>{
        const newTicket= await this.dao.create(user,amount);
        return newTicket;
    };

    deleteRepository=async(code)=>{
        const tickets= await this.dao.delete(code);
        return tickets;
    };

    uptadeRepository=async(code,ticket)=>{
        const newTicket= await this.dao.uptade(code,ticket);
        return newTicket;
    };
    
};