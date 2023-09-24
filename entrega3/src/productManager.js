import fs from 'fs'

export default class productManager{
    constructor(path){
        this.path=path //pasamos la ruta por constructor
        this.id=1
    };

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
            
            if(product.name && product.stock){
                products.push(product);
            }else{
                console.log('falta un campo por completar');
            }

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

    uptadeProduct= async (id, campo, contenido)=>{
        try{
            const products= await this.getProducts();
            const product= await this.getProductsById(id);
            if(!product){
                console.log(`no hemos encontrado el producto con el id ${id}`);
                return;
            }
            if((campo === "id")){
                console.log(`el campo ${campo} es inmodificable, porfavor vuelva a intentar`);
                return;
            }
            if(!(campo in product)){
                console.log(`el campo ${campo} es inmodificable o no existe, porfavor vuelva a intentar`);
                return;
            }

            product[campo]=contenido;
            const producto=products.find((p)=>p.code === id);
            const productIndex=products.indexOf(producto);
            products[productIndex]=product;

            await fs.promises.writeFile(this.path, JSON.stringify(products, null ,"\t"));
            
        }catch(error){
            console.log(error)
        }
    };
};

