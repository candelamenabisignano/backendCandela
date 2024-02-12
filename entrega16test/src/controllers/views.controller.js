import { getProductsService } from "../services/products.service.js";
import { getCartService } from "../services/carts.service.js";
import configs from "../config.js";
import { EErrors } from "../middlewares/errors/EErrors.js";
import jwt from 'jsonwebtoken';

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

const getLoggerTest=async(req,res)=>{
  try {
    req.logger.debug('prueba debug');
    req.logger.http('prueba http');
    req.logger.info('prueba info');
    req.logger.warning('prueba warn');
    req.logger.error('prueba error');
    req.logger.fatal('prueba fatal')
    res.send('hola')
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
const getMockingProducts=async(req,res) =>{
  try {
    const products= generateProducts()
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    throw CustomError.createError({name:'error', message:error.message, cause:error.cause, code:EErrors.INTERNAL_SERNVER_ERROR})
  }
}


const getCartView = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await getCartService(cid);
    res.render("cart", { products: cart.products });
  } catch (error) {
    req.logger.error(error.message);
  }
};

const getRegisterView = (req, res) => {
  res.render("register");
};

const getLoginView = (req, res) => {
  res.render("login");
};

const getChatView = (req, res) => {
  res.render("chat", { isUser: req.user.role === "user" ? true : false });
};

const getPasswordLinkView =(req,res)=>{
  res.render("passwordLink");
}

  const getPasswordResetView=async(req,res)=>{
    const token= req.query.token;
    try {
      let user;
      jwt.verify(token, configs.privateKey, (error, decoded) => {
        if (error) {
          req.logger.error(error.message)
          return res.status(401).send({status:'error', error:error.message})
        } else {
          user=decoded.user;
        }
      });

      res.render("passwordReset", {user:user});
    } catch (error) {
      res.status(500).send({ status: "error", error: error.message });
    }
  }
export {
  privateAccess,
  publicAccess,
  getProductsView,
  getCartView,
  getRegisterView,
  getLoginView,
  getChatView,
  getMockingProducts,
  getLoggerTest,
  getPasswordLinkView,
  getPasswordResetView
};
