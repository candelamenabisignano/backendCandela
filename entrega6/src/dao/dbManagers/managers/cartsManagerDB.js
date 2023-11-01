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
        const cart= await cartModel.findById(id);
        return cart;
    };

    add= async(cart)=>{
        const product=await cartModel.create({products:[...cart]});
        return product;
    };

    addProducts= async(cartId, productId)=>{
        const cart= await this.getById(cartId);
        const carts= await this.get();
        const some= cart.products.some((p)=> p.id === productId);

        if(some){
            const product= cart.products.find((p)=> p.id === productId);
            const newProduct= {...product, quantity:product.quantity+1};
            const index= cart.products.indexOf(product);
            cart.products[index]= newProduct;
        }else{
            cart.products.push({product:productId, quantity:1});
            const index= carts.indexOf(cart);
            carts[index]= cart
        };

        return carts;
    }

    delete=(id)=>{
        const res= cartModel.deleteOne({_id:id});
        return res;
    };

} 