import Router from 'express';
import { usersModel } from '../dao/dbManagers/models/users.model.js';
import passport from 'passport';

const router= Router();

router.post('/register',passport.authenticate('register', {failureRedirect:'fail-register'}), (req,res)=>{
    res.status(201).send({status:'success', message:'user registered'})
});

router.get('/fail-register', (req,res)=>{
    res.status(500).send({status:'error', error:'register failed'})
});

router.post('/login', passport.authenticate('login', {failureRedirect:'fail-login'}), (req,res)=>{
    if(!req.user){//si el usuario que se esta buscando no se encuentra a nivel de request devolvemos que las credenciales son incorrectas
        return res.status(401).send({status:'error', error:'invalid credentials'});
    }

    //sino seteamos a nivel de sesion los datos del req.user

    req.session.user={
        name:`${req.user.first_name} ${req.user.last_name}`,
        email:req.user.email,
        age:req.user.age,

    };
    res.status(200).send({status:'success',message:'login succeded'});

});

router.get('/fail-login', (req,res)=>{
    res.status(500).send({status:'error', error:'login failed'})
});

router.get('/github', passport.authenticate('github', {scope:['user:email']}), (req,res)=>{
    res.status(201).send({status:'success', message:"user registered"});
});

router.get('/github-callback', passport.authenticate('github', {failureRedirect:'/login'}), (req,res)=>{
    req.session.user=req.user;
    res.redirect('/products');
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


