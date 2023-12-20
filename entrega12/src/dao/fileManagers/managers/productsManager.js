import fs from 'fs';
export default class ProductsFS{
    constructor(path){
        this.path=path
    };

    get=async()=>{
        if(fs.existsSync(this.path)){
            const data= await fs.promises.readFile(this.path, 'utf-8');
            const products= JSON.parse(data);
            return products;
        }else{
            return [];
        };
    };

    getById= async (id)=>{
        const products= await this.get();
        const find=products.find((p)=>p.id == JSON.stringify(id));
        if(!find){
            console.log(`no hemos encontrado el producto con el id ${id}`);
        }else{
            return find;
        };   
    };

    add=async(product, id)=>{
            const products= await this.get();
            product.id=id;

            if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
                return console.log("falta un campo por completar")
            };

            product.status=true;
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return product;
    };
    
    delete= async (id)=>{
            const product= await this.getById(id)
            const products= await this.get()


            const index=products.findIndex((p)=> p.id === product.id)

            products.splice(index, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null ,"\t"));
            return products;
    };

    uptade= async(id , newProduct)=>{
        const products= await this.get();
        let product= await this.getById(id);

            if(!product){
                console.log(`no hemos encontrado el producto con el id ${id}`);
                return;
            };

            product= {...newProduct,id};
            const productIndex=products.findIndex((p)=> p.id == id)
            products[productIndex]=product;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null ,"\t"));
            return product;
    };

};