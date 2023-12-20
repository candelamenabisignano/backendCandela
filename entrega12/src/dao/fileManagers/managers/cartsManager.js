import fs from 'fs';
import ProductsFS from "../managers/productsManager.js";
import { __dirname } from '../../../utils.js';

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
        const find=carts.find((p)=>p.id === id);
        return find;
    };

    add= async(productBody, quantityBody, id)=>{
        const carts= await this.get();
        const products= await pmanager.get();
        const product=products.find((p)=> p.id == productBody);
        carts.push({products: [{product: productBody, quantity: quantityBody}], id:id});
        console.log(carts)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return carts;
    };

    addToCart= async(cartId, productId)=>{
        const cart= await this.getById(cartId);
        const carts= await this.get();
        const some= cart.products.some((p)=> p.product == productId);
        console.log(some)
        if(!some){
            cart.products.push({product:productId, quantity:1});
            const index= carts.findIndex((c)=> c.id == cartId);
            carts[index]=cart;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        }else{
            let productito= cart.products.find((p)=> p.product == productId);
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
        const cart= await this.getById(cartId);
        cart.products=newCart;
        const carts= await this.get();
        const cartIndex= carts.findIndex((c)=> c.id == cartId);
        carts[cartIndex]=cart
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return cart;
    };

    uptadeQuantity=async(cartId, productId, quantity)=>{
        const cart= await this.getById(cartId);
        const product=cart.products.find((p)=> p.product == productId);
        product.quantity+=quantity;
        const carts= await this.get();
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return cart;
    };
    
};