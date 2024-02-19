import UsersDTO from "../dto/usersDTO.js";

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllRepository = async () => {
    const users = await this.dao.getAll();
    return users;
  };

  getOneByEmailRepository = async (email) => {
    const user = await this.dao.getOneByEmail(email);
    return user;
  };
  getOneByIdRepository = async (id) => {
    const user = await this.dao.getOneById(id);
    return user;
  };

  registerRepository = async (user) => {
    const userToInsert = new UsersDTO(user);
    const users = await this.dao.register(userToInsert);
    return users;
  };

  uptadeRepository =async(id,user) =>{
    const userToInsert = new UsersDTO(user);
    const newUser= await this.dao.uptade(id,{...userToInsert});
    console.log(newUser)
    return newUser;
  }
}
