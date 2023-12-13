import CartsDB from "../dao/dbManagers/managers/cartsManagerDB.js";
import CartsManager from "../dao/fileManagers/managers/cartsManager.js";
import { __dirname } from "../utils.js";

const manager= new CartsManager(`${__dirname}/dao/fileManagers/files/carts.json`);
const managerDB= new CartsDB();

const getCartsService=async()=>{
    const cartsDB= await managerDB.get();
    //const carts= await manager.get();
    return cartsDB;
};

const getCartService=async(id)=>{
    //const cart= await manager.getById(id);
    const cartDB= await managerDB.getById(id);
    return cartDB;
};

const addCartService=async(product,quantity)=>{
    //const cart= await manager.add(product,quantity);
    const cartDB= await managerDB.add(product,quantity);
    return cartDB;
};

const addToCartService=async(cartId,productId)=>{
    const cartDB= await managerDB.addToCart(cartId,productId);
    //const cart= await manager.addToCart(cartId,productId);
    return cartDB;
};

const uptadeCartService=async(id, newCart)=>{
    const cartDB= await managerDB.uptade(id, newCart);
    //const cart= await manager.uptade(id,newCart);
    return cartDB;
};

const uptadeProductQuantityService=async(cid,pid,quantity)=>{
    const cartDB= await managerDB.uptadeQuantity(cid,pid,quantity);
    //const cart= await manager.uptadeQuantity(cid,pid,quantity);
    return cartDB;
};

const deleteCartService=async(id)=>{
    const cartDB= await managerDB.delete(id);
    //const cart= await manager.delete(id);
    return cartDB;
};

const deleteProductFromCartService=async(cid,pid)=>{
    const cartDB= await managerDB.deleteProduct(cid,pid);
    //const cart= await manager.deleteProduct(cid,pid);
    return cartDB;
};



export{
    getCartsService,
    getCartService,
    addCartService,
    addToCartService,
    uptadeCartService,
    uptadeProductQuantityService,
    deleteCartService,
    deleteProductFromCartService
};