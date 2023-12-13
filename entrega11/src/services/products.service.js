import productsDB from "../dao/dbManagers/managers/productsManagerDB.js";
import products from "../dao/fileManagers/managers/productsManager.js";
import {__dirname} from '../utils.js';

const managerDB= new productsDB();
const manager= new products(`${__dirname}/dao/fileManagers/files/products.json`);

const getProductsService= async(query, queryValue, limitNumber,pageNumber, sortValue)=>{
    //const products= await manager.get();
    const productsDB= await managerDB.get(query, queryValue, limitNumber,pageNumber, sortValue);
    return productsDB;
};
const getProductService= async(id)=>{
    //const products= await manager.getById();
    const productDB= await managerDB.getById(id);
    return productDB;
};
const addProductService=async(product)=>{
    const productDB= await managerDB.add(product);
    //const product= await manager.add(product);
    return productDB
};
const uptadeProductService=async(id, product)=>{
    const productDB= await managerDB.uptade(id,product);
    //const product= await manager.uptade(id,product);
    return productDB;
};
const deleteProductService=async(id)=>{
    const resultDB= await managerDB.delete(id);
    //const result= await manager.delete(id);
    return resultDB;
}
export{
    getProductService,
    getProductsService,
    addProductService,
    uptadeProductService,
    deleteProductService
}
