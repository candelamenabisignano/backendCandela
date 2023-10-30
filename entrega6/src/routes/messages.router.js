import { Router } from "express";
import messagesDB from "../dao/dbManagers/managers/messagesManagerDB.js";

const router= Router();
const managerDB= new messagesDB();

router.get('/', async(req,res)=>{
    try {
        const messages= await managerDB.get();
        res.status(200).send({status:'success', payload:messages})
    } catch (error) {
        res.status(400).send({status:'error', error:error.message})
    }
});

router.post('/', async(req,res)=>{
    const message= req.body;
    console.log(message);
    try {
        await managerDB.add(message);
        const messages= await managerDB.get();
        const io= req.app.get('socketio');
        io.emit('messages', messages);
        res.status(201).send({status:'success', payload:messages})
    }catch (error) {
        res.status(400).send({status:'error', error:error.message}) 
    }
});

export default router;