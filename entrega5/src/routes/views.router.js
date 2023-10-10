import {Router} from "express"
import productsManager from "../managers/productsManager.js";
import { __dirname } from "../utils.js";
const router= Router();
const manager= new productsManager(`${__dirname}/files/products.json`)

router.get('/', async(req,res)=>{
    try {
        res.render('home', {products: await manager.getProducts()}) 
    } catch (error) {
        console.log(error)
    }
});

router.get('/realtimeproducts', async(req,res)=>{
    try {
        res.render('realTimeProducts')
    } catch (error) {
        console.log(error)
    }
});
export default router