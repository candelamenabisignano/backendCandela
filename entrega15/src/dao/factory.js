import configs from "../config.js";

const persistence= configs.persistence;
let Carts;
let Products;
let Users;
let Tickets;

switch(persistence){
    case 'MONGO':{
        const mongoose= await import('mongoose');
        await mongoose.connect(configs.mongoUrl);
        const {default: CartsManager}= await import('./dbManagers/managers/cartsManagerDB.js');
        const {default: ProductsManager}= await import("./dbManagers/managers/productsManagerDB.js");
        const {default: UsersManager}= await import("./dbManagers/managers/usersManagerDB.js");
        const {default:TicketsManager}= await import("./dbManagers/managers/ticketsManagerDB.js")
        Carts=CartsManager;
        Users=UsersManager;
        Products=ProductsManager;
        Tickets=TicketsManager;
        break;
    };
    case 'FS':{
        const {default: CartsManager}= await import('./fileManagers/managers/cartsManager.js');
        const {default: ProductsManager}= await import('./fileManagers/managers/productsManager.js');
        const {default: UsersManager}= await import('./fileManagers/managers/usersManager.js');
        const {default: TicketsManager}= await import('./fileManagers/managers/ticketsManager.js');
        Carts=CartsManager;
        Users=UsersManager;
        Products=ProductsManager;
        Tickets=TicketsManager;
        break;
    }
};

export{
    Carts,
    Users,
    Products,
    Tickets
}