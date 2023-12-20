import {Carts} from '../dao/factory.js';
import configs from '../config.js';
import CartsRepository from '../repository/carts.repository.js';
import { __dirname } from "../utils.js";

const CartsDao= configs.persistence === 'FS' ? new Carts(`${__dirname}/dao/fileManagers/files/carts.json`) : new Carts();
const manager= new CartsRepository(CartsDao);

const getCartsService=async()=>{
    const carts= await manager.getRepository();
    return carts;
};

const getCartService=async(id)=>{
    const cart= await manager.getByIdRepository(id);
    return cart;
};

const addCartService=async(product,quantity,id)=>{
    const cart= configs.persistence === 'FS' ? await manager.addRepository(product,quantity,id) : await manager.addRepository(product,quantity);
    return cart;
};

const addToCartService=async(cartId,productId)=>{
    const cart= await manager.addToCartRepository(cartId,productId)
    return cart;
};

const uptadeCartService=async(id, newCart)=>{
    const cart= await manager.uptadeRepository(id, newCart);
    return cart;
};

const uptadeProductQuantityService=async(cid,pid,quantity)=>{
    const cart= await manager.uptadeQuantityRepository(cid,pid,quantity);
    return cart;
};

const deleteCartService=async(id)=>{
    const cart= await manager.deleteRepository(id);
    return cart;
};

const deleteProductFromCartService=async(cid,pid)=>{
    const cart= await manager.deleteProductRepository(cid,pid);
    return cart;
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