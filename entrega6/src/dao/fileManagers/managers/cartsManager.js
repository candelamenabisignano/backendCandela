import fs from 'fs';

export default class cartsManager{
    constructor(path){
        this.path=path
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

    add= async(cart, id)=>{
        const carts= await this.get();
        const _id=id
        cart.id=_id;
        carts.push({...cart, id:id});
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return {...cart, id:id};
    };

    addToCart= async(cartId, productId)=>{
        const cart= await this.getById(cartId);
        const carts= await this.get();
        const some= cart.products.some((p)=> p.product === productId);

        if(some){
            const product= cart.products.find((p)=> p.product === productId);
            product.quantity++;
            const index= carts.findIndex((c)=> c.id === cartId);
            carts[index]=cart;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        }else{
            cart.products.push({product:productId, quantity:1});
            const index= carts.findIndex((c)=> c.id === cartId);
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
};