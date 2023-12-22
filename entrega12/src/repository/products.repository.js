import configs from '../config.js'
export default class ProductsRepository{
    constructor(dao){
        this.dao=dao;
    };
    getRepository=async(query, queryValue, limitNumber,pageNumber, sortValue)=>{
        const products= configs.persistence === 'MONGO' ? await this.dao.get(query, queryValue, limitNumber,pageNumber, sortValue) : await this.dao.get();
        return products;
    };

    getByIdRepository=async(id)=>{
        const product= await this.dao.getById(id);
        return product;
    };

    addRepository=async(product)=>{
        const newProduct=  await this.dao.add(product)
        return newProduct;
    };

    deleteRepository=async(id)=>{
        const products= await this.dao.delete(id);
        return products;
    };

    uptadeRepository=async(id, product)=>{
        const newProduct= await this.dao.uptade(id,product);
        return newProduct;
    };
    
}