import passport from "passport";
import local from "passport-local";
import GithubStrategy from 'passport-github2';
import { usersModel } from "../dao/dbManagers/models/users.model.js";
import { createHash, isValid } from "../utils.js";

const LocalStrategy= local.Strategy;

const initializePassport=()=>{
    passport.use('register', new LocalStrategy({
        usernameField:'email',
        passReqToCallback:true
    }, async(req,username,password,done)=>{
        try {

            const {first_name, last_name, age}= req.body;

            const user= await usersModel.findOne({email:username});
    
            if(user){
                done(null,false)
            };
    
            const userToSave={
                first_name,
                last_name,
                email:username,
                age,
                password:createHash(password)
            };

            const result= await usersModel.create({...userToSave})
    
            return done(null, result);
            
        } catch (error) {
            return done('incorrect credentials')
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField:'email'
    }, async(username, password, done)=>{
        try {

            const user= await usersModel.findOne({email:username});

            if(!user){
                return done(null, false);
            };

            if(isValid(password, user.password) === false){
                return done(null,false);
            };

            return done(null, user);
            
        } catch (error) {
            return done('incorrect credentials');
        }
    }));

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.b6ddfdead21e5135',
        clientSecret:"7139b541f49598efef4b432d5c2ad9ac04e51f1d",
        callbackURL:'http://localhost:8080/api/sessions/github-callback',
        scope:['user:email']
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            const email= profile.emails[0].value;
            const user= await usersModel.findOne({email:email});
            
            if(!user){
                const newUser={
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                };
                
                const result = await usersModel.create(newUser);
                return done(null, result);
            }else{
                return done(null, user);
            };

        } catch (error) {
            console.log(error.message)
            done('incorrect credentials')
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user= await usersModel.findById(id);
        done(null,user);
    });
};


export{
    initializePassport
}