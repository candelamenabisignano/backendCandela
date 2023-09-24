const { productManager, Product }= require('./managers/productManager')
const manager= new productManager('./files/Products.json')

const env= async()=>{
    try{
        //aca va cualquier funcion de productManager
        const prods= await manager.getProducts()
        console.log(prods)
    }catch(error){
        console.log(error)
    }
}


env()