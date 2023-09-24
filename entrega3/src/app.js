import express from "express";
import productManager from "./productManager.js";
const manager= new  productManager ('./products.json')

const app= express();
app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res)=>{

    try {
        const products= await manager.getProducts() 
        const queryLimit= parseInt(req.query.limit)

        if(queryLimit){
            const limitProducts= products.filter((p)=> p.id <= queryLimit)
            res.send(limitProducts)
        }else{
            res.send(products)
        }
        
    } catch (error) {
        res.send(error)
    }
})

app.get('/products/:pid', async(req, res)=>{
    try {
        const id= parseInt(req.params.pid)
        const product= await manager.getProductsById(id)
        res.send(product)
    } catch (error) {
        res.send(error)
    }

})

app.listen(8080, ()=>{console.log('listening on port 8080')})