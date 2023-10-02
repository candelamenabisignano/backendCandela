import fs from 'fs';

export default class productsManager{
    constructor(path){
        this.path=path
    }

    getProducts=async ()=>{
        try{
            if(fs.existsSync(this.path)){
                const data= await fs.promises.readFile(this.path, 'utf-8');
                const products= JSON.parse(data);
                return products;
            }else{
                return [];
            }

        }catch(error){
            console.log(error);
        }
    };

    addProducts=async(product)=>{
        try{
            const products= await this.getProducts();

            const id= products.length == 0 ? 1 : products[products.length-1].id + 1

            product.id=id
            
            if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
                return console.log("falta un campo por completar")
            }

            product.status=true

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

            return products;

        }catch(error){
            console.log(error);
        }
    };


    deleteProducts=async (id)=>{
        try{
            const products= await this.getProducts();
            const find= products.find((p)=> p.id === id);

            if(!find){
                console.log(`no hemos encontrado el producto con el id ${id}`);
            }else{
                const index=products.indexOf(find);

                products.splice(index, 1);
    
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            }
            
        }catch(error){
            console.log(error);
        }
        
    };

    getProductsById= async (numero)=>{
        try{
            const products= await this.getProducts();
            const find=products.find((p)=>p.id === numero);
            if(!find){
                console.log(`no hemos encontrado el producto con el id ${numero}`);
            }else{
                return find;
            }
        }catch(error){
            console.log(error);
        }
        
    };
    deleteProductById= async (id)=>{
        try {
            const product= await this.getProductsById(id)
            const products= await this.getProducts()


            const index=products.findIndex((p)=> p.id === product.id)

            products.splice(index, 1)

            await fs.promises.writeFile(this.path, JSON.stringify(products, null ,"\t"))
            
        } catch (error) {
            console.log(error)
        }

    }
    uptadeProduct= async (id, productoNuevo)=>{
        try{
            const products= await this.getProducts();
            let product= await this.getProductsById(id);
            if(!product){
                console.log(`no hemos encontrado el producto con el id ${id}`);
                return;
            }

            product= productoNuevo

            const producto=products.find((p)=>p.id === id);
            const productIndex=products.indexOf(producto);
            products[productIndex]=product;

            await fs.promises.writeFile(this.path, JSON.stringify(products, null ,"\t"));
            
        }catch(error){
            console.log(error)
        }
    };

}