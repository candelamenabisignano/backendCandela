import configs from "../config.js";
import { getProductService, getProductsService, addProductService, uptadeProductService, deleteProductService} from "../services/products.service.js";
import { current } from "./sessions.controller.js";

const handlePolicies = (policies) =>(req, res, next) => {
    const user=req.user;
    if(user.role != policies) return res.status(404).send({status:"error",error:"no policies"});
    next();
}

const getProducts=async(req,res)=>{
    const pageQuery= Number(req.query.page)||1;
    const limit= Number(req.query.limit)||10;
    const query= req.query.query;
    const queryValue= req.query.queryValue;
    const sort= req.query.sort||'asc';
    try {
        if(configs.persistence === "MONGO"){
            const{docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage}=await getProductsService(query, queryValue, limit, pageQuery, sort);
            const prevLink= hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null;
            const nextLink= hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null;
            return res.status(200).send({status:'success', payload:[...docs], totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink });
        }else{
            const products= await getProductsService();
            return res.status(200).send({status:'success', payload:products });
        }
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const getProduct=async(req,res)=>{
    const id= req.params.id;
    try {
         const product= await getProductService(id);
         res.status(200).send({status:'success', payload:product});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const addProduct=async(req,res)=>{
    try {
        const{title,description,code,price,status,stock,category,thumbnail}=req.body;

        if(!title||!description||!code||!price||!status||!stock||!category||!thumbnail){
            return res.status(400).send({status:'error', error:'incomplete campus'});
        };
        const product=await addProductService({title,description,code,price,status,stock,category,thumbnail});

        res.status(201).send({status:'success', payload:product});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const uptadeProduct=async(req,res)=>{
    const id=req.params.id;
    try {
        const{title,description,code,price,status,stock,category,thumbnail, id}=req.body;

        if(!title||!description||!code||!price||!status||!stock||!category||!thumbnail){
            return res.status(400).send({status:'error', error:'incomplete campus'});
        };

        const product= await uptadeProductService(id, {title, description, code, price, status, stock, category, thumbnail});
        
        res.status(200).send({status:'success', payload:product});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const deleteProduct=async(req,res)=>{
    const id=req.params.id;
    try {
        const result=await deleteProductService(id);
        res.status(200).send({status:'success', payload:result});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message})
    };
}
export{
    getProduct,
    getProducts,
    addProduct,
    uptadeProduct,
    deleteProduct,
    handlePolicies
}