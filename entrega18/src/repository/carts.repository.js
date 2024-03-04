import configs from "../config.js";
export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getRepository = async () => {
    const carts = await this.dao.get();
    return carts;
  };
  getByIdRepository = async (id) => {
    const cart = await this.dao.getById(id);
    return cart;
  };
  addRepository = async (product, quantity, id) => {
    const cart =
      configs.persistence === "FS"
        ? await this.dao.add(product, quantity, id)
        : await this.dao.add(product, quantity);
    return cart;
  };
  addToCartRepository = async (cartId, productId) => {
    const cart = await this.dao.addToCart(cartId, productId);
    return cart;
  };
  deleteRepository = async (id) => {
    const carts = await this.dao.delete(id);
    return carts;
  };
  deleteProductRepository = async (cartId, productId) => {
    const carts = await this.dao.deleteProduct(cartId, productId);
    return carts;
  };
  uptadeRepository = async (cartId, newCart) => {
    const cart = await this.dao.uptade(cartId, newCart);
    return cart;
  };
  uptadeQuantityRepository = async (cartId, productId, quantity) => {
    const cart = await this.dao.uptadeQuantity(cartId, productId, quantity);
    return cart;
  };
}
