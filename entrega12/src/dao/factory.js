import configs from "../config.js";

const persistence= configs.persistence;
let Carts;
let Products;
let Users;

switch(persistence){
    case 'MONGO':{
        const mongoose= await import('mongoose');
        await mongoose.connect(configs.mongoUrl);
        const {default: CartsManager}= await import('./dbManagers/managers/cartsManagerDB.js');
        const {default: ProductsManager}= await import("./dbManagers/managers/productsManagerDB.js");
        const {default: UsersManager}= await import("./dbManagers/managers/usersManagerDB.js");
        Carts=CartsManager;
        Users=UsersManager;
        Products=ProductsManager;
        break;
    };
    case 'FS':{
        const {default: CartsManager}= await import('./fileManagers/managers/cartsManager.js');
        const {default: ProductsManager}= await import('./fileManagers/managers/productsManager.js');
        const {default: UsersManager}= await import('./fileManagers/managers/usersManager.js');
        Carts=CartsManager;
        Users=UsersManager;
        Products=ProductsManager;
        break;
    }
};

export{
    Carts,
    Users,
    Products
}