export default class UsersDTO {
  constructor(user) {
    this.password = user.password;
    this.name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.role = user.role;
    this.age = user.age;
    this.cart = user.cart;
    this._id=user._id;
    this.last_connection= user.last_connection;
    this.documents=user.documents;
    this.status= user.status;
  }
}
