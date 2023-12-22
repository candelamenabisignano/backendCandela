import { getProductsService } from "../services/products.service.js";
import { getCartService } from "../services/carts.service.js";
import { messages } from "../app.js";
import configs from "../config.js";

const publicAccess = (req, res, next) => {
  if (req.user != (null || undefined)) {
    return res.redirect("/products");
  } else {
    return next();
  }
};

const privateAccess = (req, res, next) => {
  if (req.user == (null || undefined)) return res.redirect("/login");
  return next();
};

const getProductsView = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const query = req.query.query;
  const queryValue = req.query.queryValue;
  const sort = req.query.sort || "asc";
  try {
    if (configs.persistence === "MONGO") {
      const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
        await getProductsService(query, queryValue, limit, page, sort);
      const prevLink = hasPrevPage
        ? `/products?page=${prevPage}&limit=${limit}`
        : null;
      const nextLink = hasNextPage
        ? `/products?page=${nextPage}&limit=${limit}`
        : null;
      res.render("products", {
        persistence: configs.persistence,
        products: docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        nextLink,
        prevLink,
        user: req.user,
      });
    } else {
      const products = await getProductsService();
      res.render("products", {
        persistence: configs.persistence === "MONGO" ? true : false,
        user: req.user,
        products: products,
      });
    }
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const getCartView = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await getCartService(cid);
    res.render("cart", { products: cart.products });
  } catch (error) {
    console.log(error.message);
  }
};

const getRegisterView = (req, res) => {
  res.render("register");
};

const getLoginView = (req, res) => {
  res.render("login");
};

const getChatView = (req, res) => {
  console.log(messages);
  res.render("chat", { isUser: req.user.role === "user" ? true : false });
};

export {
  privateAccess,
  publicAccess,
  getProductsView,
  getCartView,
  getRegisterView,
  getLoginView,
  getChatView,
};
