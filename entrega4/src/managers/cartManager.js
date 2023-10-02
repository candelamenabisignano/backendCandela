import fs from "fs";

export default class cartManager{
    constructor(path){
        this.path=path
    }

    getCarts=async ()=>{
        try{
            if(fs.existsSync(this.path)){
                const data= await fs.promises.readFile(this.path, 'utf-8');
                const carts= JSON.parse(data);
                return carts;
            }else{
                return [];
            }

        }catch(error){
            console.log(error);
        }
    };

    getCartsById= async (id)=>{
        try{
            const carts= await this.getCarts();
            const find=carts.find((p)=>p.id === id);
            return find;
        }catch(error){
            console.log(error);
        }
        
    };

    addCarts=async(cart)=>{
        try{
            const carts= await this.getCarts();

            const id= carts.length === 0 ? 1 : carts[carts.length-1].id + 1

            cart.id=id

            carts.push({...cart, id:id});

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

            return carts;

        }catch(error){
            console.log(error);
        }
    };

    addProducts= async(cartId, productId)=>{
        try {
            const cart= await this.getCartsById(cartId);
            const carts= await this.getCarts()
            const some= cart.products.some((p)=> p.product === productId)

            if(some){
                const product= cart.products.find((p)=> p.product === productId);
                product.quantity++ 
                const index= carts.findIndex((c)=> c.id === cartId)
                carts[index]=cart
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
            }else{
                cart.products.push({product:productId, quantity:1})
                const index= carts.findIndex((c)=> c.id === cartId)
                carts[index]=cart
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
            }
            return carts;
        } catch (error) {
            console.log(error)
        }
    }


}