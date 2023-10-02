import {Router} from "express";
import productsManager from "../managers/productsManager.js";

const manager= new productsManager("../src/files/products.json")

const router= Router();

router.get('/', async (req, res)=>{
    const queryLimit= parseInt(req.query.limit);
    const products= await manager.getProducts()
    if(!queryLimit){
        return res.send({status:'success', payload:products});
    }else{
        const result= products.filter((p)=> p.id <= queryLimit);
        return res.send({status:'success', payload:result})
    }
});

router.get("/:id", async (req,res)=>{
    const id=parseInt(req.params.id);
    const productId= await manager.getProductsById(id)

    if(productId === undefined){
        return res.status(400).send({status:'error',message:`no econtramos en producto con el id ${id}` })
    }

    productId;
    return res.status(200).send({status:'success', payload:productId})
});

router.post('/', async(req,res)=>{
    const product=req.body;

    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        return res.status(400).send({status:'error', error:'incomplete campus'});
    };

    const addedProduct= await manager.addProducts(product);

    return res.status(200).send({status:'success', message:'product created', payload:addedProduct});
});

router.put("/:id", async (req,res)=>{
    const id=parseInt(req.params.id);
    const product={...req.body, id:id};

    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || !product.category){
        return res.status(400).send({status:'error', error:'incomplete campus'});
    };

    if(!product.status){
        const productId= await manager.getProductsById(id);
        product.status= productId.status
    }else{
        product.status
    }

    await manager.uptadeProduct(id, product);
    return res.status(200).send({status:'success', payload: product})
});

router.delete("/:pid", async(req,res)=>{
    const id=parseInt(req.params.pid)
    const product= await manager.getProductsById(id)

    if(product === undefined){
        return res.status(400).send({status:'error', error:'product not found'})
    }

    await manager.deleteProductById(id)

    const products= await manager.getProducts()

    return res.status(200).send({status:'success', payload:products})

    

});

export default router