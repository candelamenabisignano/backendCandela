import {Router} from "express"
import productsManager from "../managers/productsManager.js";
import { __dirname } from "../utils.js";

const router= Router();
const manager= new productsManager(`${__dirname}/files/products.json`)

router.post('/', async(req,res)=>{

    try {
        const product= req.body;

    
        const io= req.app.get('socketio')
    
        await manager.addProducts(product);
        const products= await manager.getProducts();
        console.log(products)
    
        io.emit('productsNew', products);
        
    } catch (error) {
        console.log(error)
    }
})

export default router