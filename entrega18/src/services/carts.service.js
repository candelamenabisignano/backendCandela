import { Carts } from "../dao/factory.js";
import configs from "../config.js";
import CartsRepository from "../repository/carts.repository.js";
import { __dirname } from "../utils/utils.js";
import { uptadeProductService } from "./products.service.js";
import { createTicketService } from "./tickets.service.js";
import { fakerES as faker } from "@faker-js/faker";
const CartsDao =
  configs.persistence === "FS"
    ? new Carts(`${__dirname}/dao/fileManagers/files/carts.json`)
    : new Carts();
const manager = new CartsRepository(CartsDao);
const getCartsService = async () => {
  const carts = await manager.getRepository();
  return carts;
};
const getCartService = async (id) => {
  const cart = await manager.getByIdRepository(id);
  return cart;
};
const addCartService = async (product, quantity, id) => {
  const cart = await manager.addRepository(product, quantity);
  return cart;
};
const addToCartService = async (cartId, productId) => {
  const cart = await manager.addToCartRepository(cartId, productId);
  return cart;
};
const uptadeCartService = async (id, newCart) => {
  const cart = await manager.uptadeRepository(id, newCart);
  return cart;
};
const uptadeProductQuantityService = async (cid, pid, quantity) => {
  const cart = await manager.uptadeQuantityRepository(cid, pid, quantity);
  return cart;
};
const deleteCartService = async (id) => {
  const cart = await manager.deleteRepository(id);
  return cart;
};
const deleteProductFromCartService = async (cid, pid) => {
  const cart = await manager.deleteProductRepository(cid, pid);
  return cart;
};
let amount = 0;
let outStock = [];
const endPurchaseService = async (cid, user) => {
  const cart = await manager.getByIdRepository(cid);
  cart.products.forEach(async ({ product, quantity }) => {
    if (product.stock >= quantity) {
      amount += product.price * quantity;
      const newOne = { ...product, stock: product.stock - quantity };
      await uptadeProductService(product.id, newOne);
    } else {
      outStock.push({ product, quantity });
    }
  });
  const newCart = await manager.uptadeRepository(cid, {
    products: outStock,
    id: cid,
  });
  const ticket = {
    code: faker.commerce.isbn({ variant: 10 }),
    purchase_datetime: new Date(),
    amount: amount,
    purchaser: user.email,
  };
  const ticketCreated = await createTicketService(ticket);
  return outStock.length === 0
    ? { ticket: ticketCreated }
    : { ticket: ticketCreated, cart: newCart };
};
export {
  getCartsService,
  getCartService,
  addCartService,
  addToCartService,
  uptadeCartService,
  uptadeProductQuantityService,
  deleteCartService,
  deleteProductFromCartService,
  endPurchaseService,
};
