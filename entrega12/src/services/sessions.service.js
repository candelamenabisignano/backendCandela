import configs from "../config.js";
import { Users } from "../dao/factory.js";
import UsersRepository from '../repository/users.repository.js';
import { __dirname } from "../utils.js";

const UsersDao= configs.persistence === "FS" ? new Users(`${__dirname}/dao/fileManagers/files/users.json`) : new Users();
const manager= new UsersRepository(UsersDao);

const getUsersService=async()=>{
    const users= await manager.getAllRepository();
    return users;
};

const getUserService=async(email)=>{
    const user= await manager.getOneRepository(email);
    return user;
};

const registerService=async(user)=>{
    const newUser= await manager.registerRepository(user);
    return newUser;
};

export{
    getUsersService,
    getUserService,
    registerService
};