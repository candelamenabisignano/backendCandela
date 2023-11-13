import { Router } from "express";
import products from "../dao/fileManagers/managers/productsManager.js";
import productsDB from "../dao/dbManagers/managers/productsManagerDB.js";
import { __dirname } from "../utils.js";
const router= Router();
const manager= new products(`${__dirname}/dao/fileManagers/files/products.json`);
const managerDB= new productsDB();

router.get('/', async(req,res)=>{
    const pageQuery= Number(req.query.page)||1;
    const limit= Number(req.query.limit)||10;
    const query= req.query.query;
    const queryValue= req.query.queryValue;
    const sort= req.query.sort||'asc';
    try {
        const{docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage}=await managerDB.get(query, queryValue, limit, pageQuery, sort);
        //const products= await manager.get();
        const prevLink= hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null;
        const nextLink= hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null;
        res.status(200).send({status:'success', payload:[...docs], totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink });
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});

router.get('/:id', async(req,res)=>{
    const id= req.params.id;

    try {
        //const product= await manager.getById(id);
        const productDB= await managerDB.getById(id);
        res.status(200).send({status:'success', payload:productDB});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});

router.post('/', async(req,res)=>{

    try {
        const{title,description,code,price,status,stock,category,thumbnail}=req.body;

        if(!title||!description||!code||!price||!status||!stock||!category||!thumbnail){
            return res.status(400).send({status:'error', error:'incomplete campus'});
        };
        const productDB=await managerDB.add({title,description,code,price,status,stock,category,thumbnail});
        //const product= await manager.add({title,description,code,price,status,stock,category,thumbnail}, productDB._id);

        res.status(201).send({status:'success', payload:productDB});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});

router.put('/:id', async(req,res)=>{
    const id=req.params.id;
    try {
        const{title,description,code,price,status,stock,category,thumbnail}=req.body;

        if(!title||!description||!code||!price||!status||!stock||!category||!thumbnail){
            return res.status(400).send({status:'error', error:'incomplete campus'});
        };

        const productDB= await managerDB.uptade(id, {title, description, code, price, status, stock, category, thumbnail});
        //const product= await manager.uptade(id, {title, description, code, price, status, stock, category, thumbnail, id:id});
        
        res.status(200).send({status:'success', payload:productDB});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});

router.delete('/:id', async(req,res)=>{
    const id=req.params.id;
    try {
        //const result=await manager.deleteById(id);
        const resultDB=await managerDB.delete(id);
        res.status(200).send({status:'success', payload:resultDB});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message})
    };
});

export default router;