import {Router} from "express"
import productsManager from "../managers/productsManager.js";
import { __dirname } from "../utils.js";

const router= Router();
const manager= new productsManager(`${__dirname}/files/products.json`)

router.post('/', async(req,res)=>{

    try {
        const product= req.body;
        await manager.addProducts(product);
        const products= await manager.getProducts();

        const io= req.app.get('socketio');
        io.emit('productsNew', products);

        res.status(200).send({status:'success'})
    } catch (error) {
        res.status(500).send({status:'error'})
    }
})
router.get('/', async (req,res)=>{
    try {

        res.status(200).send({status:'success', payload: await manager.getProducts()})
        
    } catch (error) {
        res.status(400).send({status:'error'})
    }
})

export default router