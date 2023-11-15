import Router from 'express';
import { usersModel } from '../dao/dbManagers/models/users.model.js';
import { createHash, isValid } from '../utils.js';

const router= Router();

router.post('/register', async(req,res)=>{
    try {
        const {first_name, last_name, email, age, password}= req.body;

        if(!first_name ||!last_name||!email||!age||!password){
            return res.status(422).send({status:"error", error:"incomplete campus"})
        };

        const exists= await usersModel.findOne({email});

        if(exists){
            return res.status(400).send({status:"error", error:"user already exists"});
        }else{
            await usersModel.create({
                first_name,
                last_name,
                email,
                age,
                password:createHash(password) //almacenamos la contraseña ya hasheada en la DB
            })
        };

        return res.status(200).send({status:"success", message:"user registed"})
    } catch (error) {
        res.status(500).send({status:'error', error:error.message})
    }
});

router.post('/login', async(req,res)=>{
    try {
        const{email, password}= req.body;
        const user= await usersModel.findOne({email});

        if(!user){
            return res.status(401).send({status:"error", error:"incorrect credentials"});
        };

        //vamso a corroborar que la contra que nos llegue plana es igual a la contra hasheada de la DB

        if(isValid(password, user.password) === false){
            return res.status(401).send({status:"error", error:'incorrect credentials'})
        };

        const isAdmin=user.email === 'adminCoder@coder.com' && password === 'adminCod3r123' ? 'admin' : 'user'

        req.session.user= {
            name: `${user.first_name} ${user.last_name}`,
            email:user.email,
            age:user.age,
            role: isAdmin
        }

        return res.status(200).send({status:"success", message:"login succeded"})
    } catch (error) {
        res.status(500).send({status:"error", error:error.message})
    }
});

router.get('/logout', async(req,res)=>{
    req.session?.destroy((error)=>{
        if(!error){
            res.redirect('/login');
            console.log('session destroyed!')
        }else{
            res.send({status:'error', error:error.message})
        }
    })
});

export default router;


