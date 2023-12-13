import UsersManager from '../dao/dbManagers/managers/usersManagerDB.js';

const managerDB= new UsersManager();

const getUsersService=async()=>{
    const users= await managerDB.getAll();
    return users;
};

const getUserService=async(email)=>{
    const user= await managerDB.get(email);
    return user;
};

const registerService=async(user)=>{
    const newUser= await managerDB.register(user);
    return newUser;
};

export{
    getUsersService,
    getUserService,
    registerService
};