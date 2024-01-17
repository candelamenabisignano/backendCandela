import fs from "fs";

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

  getOne = async (email) => {
    const users = await this.getAll();
    const user = users.find((u) => u.email === email);
    return user;
  };

  register = async (user) => {
    const users = await this.getAll();
    users.push(user);
    await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));
    return user;
  };
}
