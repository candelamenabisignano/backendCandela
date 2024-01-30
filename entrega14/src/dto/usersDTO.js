import { createHash } from "../utils.js";
import {v4 as uuidv4} from 'uuid';
import configs from "../config.js";

export default class UsersDTO {
  constructor(user) {
    this.password = createHash(user.password);
    this.name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.role = user.role;
    this.age = user.age;
    this.cart = user.cart;
    this.id=user.id
  }
}
