import passport from 'passport';
import { createHash, generateToken } from '../utils.js';
import {getUsersService,getUserService,registerService} from '../services/sessions.service.js';

const getUsers=async(req,res)=>{
    try {
        const users= await getUsersService();
        res.send({status:'success', payload:users});
    } catch (error) {
        res.status(500).send({status:'error', error:error.message});
    };
};

const register=async(req,res)=>{
    try {
        const {first_name, last_name, email, age, password,cart,role}= req.body;

        const user= await getUserService(email);

        if(user){
            return res.status(400).send({status:'error', error:'an user has already registered with this email'});
        };

        await registerService({first_name:first_name, last_name:last_name, email: email, age:age, password:createHash(password), cart:cart, role:role});
        res.status(201).send({status:'success', message:'user registered', payload: user});
    } catch (error) {
        res.status(500).send({status:'error', error:error.message});
    };
};

const login=async(req,res)=>{
    try {
        const{email, ...passwordConst}= req.body;
        

        const user= await getUserService(email);

        if(!user){
            return res.status(401).send({status:'error', error:"invalid credentials"});
        };

        const{password:_, ...userToken}=user;

        const token= generateToken(userToken);

        res.cookie('tokenCookie', token, {maxAge:100*100*100, httpOnly:true}).send({status:'success', payload: user});
    
    } catch (error) {
        res.status(500).send({status:"error", error:error.message});
    };
};

const current=async(req,res)=>{
    try {
        if(req.user === (undefined || null)){
            return res.status(400).send({status:'error', error:"user not found"});
        };
        req.user= req.user;
        res.status(200).send({status:'success', payload:req.user});
    } catch (error) {
        res.status(500).send({status:'error', error:error.message});
    };
};

const github=(req,res)=>{
    res.status(201).send({status:'success', message:"user registered"});
};

const githubCallBack=(req,res)=>{
    req.user=req.user;
    res.redirect('/products');
};

const logout=async(req,res)=>{
    try {
        const cookie= req.cookies['tokenCookie'];
        if(!cookie){
            return res.status(400).send({status:'error', error:"cookie not found"});
        };

        req.user= null;
        res.clearCookie('tokenCookie');
        res.redirect('/products');
        
    } catch (error) {
        res.status(500).send({status:'error', error:error.message});
    };
};

export{
    getUsers,
    register,
    login,
    current,
    github,
    githubCallBack,
    logout
};