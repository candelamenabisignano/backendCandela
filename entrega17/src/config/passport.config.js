import passport from "passport";
import jwt from 'passport-jwt';
import GithubStrategy from 'passport-github2';
import { usersModel } from "../dao/dbManagers/models/users.model.js";
import { PRIVATE_KEY } from "../utils/utils.js";
import configs from "../config.js";


const JwtStrategy= jwt.Strategy;
const Extractor= jwt.ExtractJwt;

const initializePassport=()=>{
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest:Extractor.fromExtractors([current]), // como queremos que passport obtenga las cookies
        secretOrKey:PRIVATE_KEY //para acceder a los headers
    },async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload.user._doc);
        } catch (error) {
            done(error.message);
        }
    }));

    passport.use('github', new GithubStrategy({
        clientID: configs.clientId,
        clientSecret:configs.clientSecret,
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
    }));


};

const current = req => {
    let token = null;
    if(req && req.cookies) { //si existe req.cookies que setee el token como el valor que tenemos en 'tokenCookie'
        token = req.cookies['tokenCookie'];
    };
    return token; //este resultado se setea en jwt_payload
};

export{
    initializePassport
}