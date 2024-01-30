import configs from "../config.js";
import { Users } from "../dao/factory.js";
import UsersRepository from "../repository/users.repository.js";
import { __dirname } from "../utils.js";

const UsersDao =
  configs.persistence === "FS"
    ? new Users(`${__dirname}/dao/fileManagers/files/users.json`)
    : new Users();
const manager = new UsersRepository(UsersDao);

const getUsersService = async () => {
  const users = await manager.getAllRepository();
  return users;
};

const getUserByEmailService = async (email) => {
  const user = await manager.getOneByEmailRepository(email);
  return user;
};
const getUserByIdService = async (id) => {
  const user = await manager.getOneByIdRepository(id);
  return user;
};

const registerService = async (user) => {
  const newUser = await manager.registerRepository(user);
  return newUser;
};

const uptadeService= async (id,user) =>{
  const newUser=await manager.uptadeRepository(id,user);
  return newUser
}
export { getUsersService,getUserByEmailService,getUserByIdService, registerService , uptadeService};
