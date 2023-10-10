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
        io.emit('productsNew', products)

        res.status(200).send({status:'success'})
    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/:pid', async(req,res)=>{
    try {
        
        const productId=parseInt(req.params.pid)
        await manager.deleteProductById(productId);
        const products= await manager.getProducts();
        console.log(products)

        const io= req.app.get('socketio');
        io.emit('productsEliminate', {products:products, id:productId});
        return res.send({status:'success', payload:products})

    } catch (error) {
        res.status(500).send({status:'error'})
    }
});

router.get('/', async (req,res)=>{
    res.send({status:'success', payload: await manager.getProducts()})
})

export default router