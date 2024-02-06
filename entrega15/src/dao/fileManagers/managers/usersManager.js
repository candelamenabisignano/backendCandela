import fs from "fs";
import { v4 as uuidv4 } from "uuid";
export default class UsersFS {
  constructor(path) {
    this.path = path;
  }

  getAll = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const users = JSON.parse(data);
      return users;
    } else {
      return [];
    }
  };

  getOneById = async (id) => {
    const users = await this.getAll();
    const user= users.find((u) => u.id === id);
    return user;
  };
  getOneByEmail = async (email) => {
    const users = await this.getAll();
    const user= users.find((u) => u.email === email);
    return user;
  };

  register = async (user) => {
    const users = await this.getAll();
    user.id= uuidv4()
    users.push(user);
    await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));
    return user;
  };

  uptade= async (id,newUser)=>{
    let users= await this.getAll()
    let user= await this.getOneById(id);
    user=newUser;
    const index=users.findIndex((u)=> u.id === id);
    users[index]=user;
    await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"))
    return newUser;
  }
}
