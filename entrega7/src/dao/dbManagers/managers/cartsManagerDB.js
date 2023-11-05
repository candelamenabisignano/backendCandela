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
        const cart= await cartModel.findById(id).lean();
        return cart;
    };

    add= async(cart)=>{
        const product=await cartModel.create({products:[...cart]});
        return product;
    };

    addProducts= async(cartId, productId)=>{
        const cart= await this.getById(cartId);
        const carts= await this.get();
        const some= cart.products.some((p)=> p.product._id == productId);

        if(some){
            const product= cart.products.find((p)=> p.product._id == productId);
            const newProduct= {product:{...product.product}, quantity:product.quantity+1};
            const index= cart.products.findIndex((p)=> p.product._id == productId);
            cart.products[index]= newProduct;
        }else{
            console.log(JSON.stringify(cart) +'hola console.log');
            cart.products.push({product:productId, quantity:1});
        };
        await cartModel.findByIdAndUpdate(cartId, cart);
        return cart;
    };

    delete=async (id)=>{
        const cart= await this.getById(id);
        cart.products.splice(0, cart.products.length);
        await cartModel.findByIdAndUpdate(id, cart);
        return cart;
    };

    deleteProduct=async (cartId, productId)=>{
        const cart= await this.getById(cartId);
        const index= cart.products.findIndex((p)=> p.product._id == productId);
        cart.products.splice(index, 1);
        await cartModel.findByIdAndUpdate(cartId, cart);
        return cart;
    };

    uptade=async(cartId, newCart)=>{
        const cart= await this.getById(cartId);
        cart.products= newCart;
        await cartModel.updateOne({_id:cartId}, cart);
        return cart
    };

    uptadeQuantity=async(cartId, productId, quantity)=>{
        const cart= await this.getById(cartId);
        const product=cart.products.find((p)=> p.product._id == productId);
        product.quantity+=quantity;
        await cartModel.findByIdAndUpdate(cartId, cart)
        return cart;
    };

} 