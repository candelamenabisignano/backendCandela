import { usersModel } from "../models/users.model.js";
export default class UsersDB {
  constructor() {}
  getAll = async () => {
    const users = await usersModel.find({}).lean();
    return users;
  };
  getOneByEmail = async (email) => {
    const user = await usersModel.findOne({ email: email }).lean();
    return user;
  };
  getOneById = async (id) => {
    const user = await usersModel.findById(id).lean();
    return user;
  };
  register = async (user) => {
    const newUser = await usersModel.create({ ...user });
    return newUser;
  };
  uptade = async (id, user) => {
    const newUser = await usersModel.findByIdAndUpdate(id, user);
    return newUser;
  };
  delete = async (id) => {
    const deletedUser = await usersModel.findByIdAndDelete(id);
    return deletedUser;
  };
}
