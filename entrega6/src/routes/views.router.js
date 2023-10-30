import {Router} from 'express';
import { __dirname } from '../utils.js';
const router= Router();

router.get('/', async (req,res)=>{
    try {
        res.render('chat') 
    } catch (error) {
        console.log(error)
    }
});

export default router