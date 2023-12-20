import UsersDTO from '../dto/usersDTO.js';

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao
    };

    getAllRepository=async()=>{
        const users= await this.dao.getAll();
        return users;
    }

    getOneRepository = async (email) => {
        const user = await this.dao.getOne(email);
        return user;
    }

    registerRepository= async (user) => {
        const userToInsert= new UsersDTO(user);
        const users= await this.dao.register(userToInsert);
        return users;
    }
}