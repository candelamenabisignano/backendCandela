import { cartModel } from "../models/cart.model.js";
export default class CartsDB {
  constructor() {}
  get = async () => {
    const carts = cartModel.find().lean();
    return carts;
  };
  getById = async (id) => {
    const cart = await cartModel.findById(id).lean();
    return cart;
  };
  add = async (productBody, quantityBody) => {
    const product = await cartModel.create({
      products: [{ quantity: quantityBody, product: productBody }],
    });
    return product;
  };
  addToCart = async (cartId, productId) => {
    let cart = await this.getById(cartId);
    const carts = await this.get();
    const some = cart.products.some(
      (p) => p.product._id.toString() === productId
    );
    if (!some) {
      cart.products.push({ product: productId, quantity: 1 });
      const index = carts.findIndex((c) => c._id.toString() === cartId);
      const newCart = await this.getById(cartId);
      carts[index] = newCart;
    } else {
      const product = cart.products.find(
        (p) => p.product._id.toString() === productId
      );
      product.quantity++;
      const index = cart.products.findIndex(
        (p) => p.product._id.toString() === productId
      );
      cart.products[index] = product;
    }
    const cartUptaded = await cartModel.findByIdAndUpdate(cartId, cart);
    return cartUptaded;
  };
  delete = async (id) => {
    const cart = await this.getById(id);
    cart.products.splice(0, cart.products.length);
    await cartModel.findByIdAndUpdate(id, cart);
    return cart;
  };
  deleteProduct = async (cartId, productId) => {
    const cart = await this.getById(cartId);
    const index = cart.products.findIndex((p) => p.product._id == productId);
    cart.products.splice(index, 1);
    await cartModel.findByIdAndUpdate(cartId, cart);
    return cart;
  };
  uptade = async (cartId, newCart) => {
    const cart = await this.getById(cartId);
    cart.products = newCart;
    await cartModel.updateOne({ _id: cartId }, cart);
    return cart;
  };
  uptadeQuantity = async (cartId, productId, quantity) => {
    const cart = await this.getById(cartId);
    const product = cart.products.find((p) => p.product._id == productId);
    product.quantity += quantity;
    await cartModel.findByIdAndUpdate(cartId, cart);
    return cart;
  };
}
