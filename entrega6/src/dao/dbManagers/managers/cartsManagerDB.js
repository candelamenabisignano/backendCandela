import { cartModel } from "../models/cart.model.js";

export default class cartsDB{
    constructor(){
        console.log('working carts from DB')
    };

    get=async()=>{
        const carts= cartModel.find().lean();
        return carts;
    };

    getById=async(id)=>{
        const cart= await cartModel.find({_id:id});
        return cart;
    };

    add= async(cart)=>{
        const product=await cartModel.create({products:[...cart]});
        return product;
    };

    // addProduct= async(cartId, productId)=>{
    //     const cart= await this.getById(cartId);
    //     const carts= await this.get();
    //     const products= cart.products;
    //     const some= products.some((p)=> p.id === productId);

    //     if(some){
    //         const product= products.find((p)=> p.product === productId);
    //         const index= carts.findIndex((c)=> c.id === cartId);
    //         carts[index]=cart;
    //     }else{
    //           products.push({product:productId, quantity:1});
    //         const index= carts.findIndex((c)=> c.id === cartId);
    //         carts[index]=cart;
    //     };

    //     const cartRes= await this.get();

    //     return cartRes;
    // };

    delete=(id)=>{
        const res= cartModel.deleteOne({_id:id});
        return res;
    };

} 