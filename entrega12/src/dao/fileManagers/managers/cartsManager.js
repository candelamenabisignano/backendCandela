import fs from 'fs';
import ProductsFS from "../managers/productsManager.js";
import { __dirname } from '../../../utils.js';
import {v4 as uuidv4} from 'uuid'

const pmanager= new ProductsFS(`${__dirname}/dao/fileManagers/files/products.json`)
export default class CartsFS{
    constructor(path){
        this.path=path
        console.log('fs carts running')
    }

    get= async ()=>{
        if(fs.existsSync(this.path)){
            const data= await fs.promises.readFile(this.path, 'utf-8');
            const carts= JSON.parse(data);
            return carts;
        }else{
            return [];
        };
    };

    getById=async(id)=>{
        const carts= await this.get();
        const find=carts.find((c)=>c.id === id);
        return find;
    };

    add= async(productBody, quantityBody)=>{
        const carts= await this.get();
        const product=await pmanager.getById(productBody);
        console.log(product)
        carts.push({products: [{product: product, quantity: quantityBody}], id:uuidv4()});
        console.log(carts)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return carts;
    };

    addToCart= async(cartId, productId)=>{
        const cart= await this.getById(cartId);
        const carts= await this.get();
        const some= cart.products.some((p)=> p.product.id == productId);
        console.log(some)
        if(!some){
            const productito= await pmanager.getById(productId)
            cart.products.push({product:productito, quantity:1});
            const index= carts.findIndex((c)=> c.id == cartId);
            carts[index]=cart;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        }else{
            let productito= cart.products.find((p)=> p.product.id == productId);
            productito= {...productito, quantity:productito.quantity+=1}
            const index= carts.findIndex((c)=> c.id == cartId);
            carts[index]=cart;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        };
        return carts;
    };

    delete=async(id)=>{
        const carts= await this.get();
        const index= carts.findIndex((c)=> c.id === id);
        carts.splice(index,1);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return carts;
    };

    deleteProduct=async(cartId, productId)=>{
        const cart= await this.getById(cartId);
        console.log(cart)
        const index= cart.products.findIndex((p)=> p.product == productId);
        cart.products.splice(index, 1);
        const carts= await this.get();
        const cartIndex= carts.findIndex((c)=>c.id == cartId);
        carts[cartIndex]=cart
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return cart;
    };

    uptade=async(cartId, newCart)=>{
        let cart= await this.getById(cartId);
        cart=newCart;
        newCart.products.forEach(async(p,i)=>{
            const product=await pmanager.getById(p.product)
            newCart.products[i].product= product;
        })
        const carts= await this.get();
        const cartIndex= carts.findIndex((c)=> c.id == cartId);
        carts[cartIndex]=cart;
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return carts;
    };

    uptadeQuantity=async(cartId, productId, quantity)=>{
        const cart= await this.getById(cartId);
        const product=cart.products.find((p)=> p.product.id == productId);
        product.quantity+=quantity;
        const carts= await this.get();
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return cart;
    };
    
};