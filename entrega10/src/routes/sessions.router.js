import Router from 'express';
import UsersManager from '../dao/dbManagers/managers/usersManagerDB.js';
import passport from 'passport';
import { createHash, generateToken } from '../utils.js';

const router= Router();
const usersManager= new UsersManager();

router.post('/register', async(req,res)=>{
    try {
        const {first_name, last_name, email, age, password,cart,role}= req.body;

        const user= await usersManager.get(email);

        if(user){
            return res.status(400).send({status:'error', error:'an user has already registered with this email'})
        };

        await usersManager.register({first_name:first_name, last_name:last_name, email: email, age:age, password:createHash(password), cart:cart, role:role});
        return res.status(201).send({status:'success', message:'user registered', payload: user});
    } catch (error) {
        res.status(500).send({status:'error', error:error.message});
    };
});

router.post('/login', async(req,res)=>{

    try {
        const{email, ...passwordConst}= req.body;
        console.log(passwordConst.password)
        

        const exists= await usersManager.get(email);

        if(!exists){
            return res.status(401).send({status:'error', error:"invalid credentials"});
        };

        const{password:_, ...userToken}=exists;

        //console.log(userToken);
        const token= generateToken(userToken);

        res.cookie('tokenCookie', token, {maxAge:100*100*100, httpOnly:true}).send({status:'success', payload: exists});
    
    } catch (error) {
        res.status(500).send({status:"error", error:error.message});
    };

});

router.get('/current', passport.authenticate('jwt', {session:false}), async (req,res)=>{
    try {
        if(req.user === (undefined || null)){
            return res.status(400).send({status:'error', error:"user not found"});
        };
        return res.status(200).send({status:'success', payload:req.user});

    } catch (error) {
        res.status(500).send({status:'error', error:error.message});
    };
});


router.get('/github', passport.authenticate('github', {scope:['user:email']}), (req,res)=>{
    res.status(201).send({status:'success', message:"user registered"});
});

router.get('/github-callback', passport.authenticate('github', {failureRedirect:'/login'}), (req,res)=>{
    req.user=req.user;
    res.redirect('/products');
});

router.get('/logout', async(req,res)=>{
    req.destroy((error)=>{
        if(!error){
            res.redirect('/login');
            console.log('session destroyed!')
        }else{
            res.send({status:'error', error:error.message})
        }
    })
});

export default router;


