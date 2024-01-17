import passport from "passport";
import { Router } from "express";
import {current,login,logout,register,getUsers,github,githubCallBack} from '../controllers/sessions.controller.js';

const router= Router()

router.get('/', getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/current', passport.authenticate('jwt', {session:false}), current);
router.get('/github', passport.authenticate('github', {scope:['user:email']}), github);
router.get('/github-callback',passport.authenticate('github', {failureRedirect:'/login'}), githubCallBack);
router.get('/logout', logout);

export default router;