import configs from "../config.js";
import {
  getProductService,
  getProductsService,
  addProductService,
  uptadeProductService,
  deleteProductService,
} from "../services/products.service.js";
import { generateProducts } from "../mocking/generateProducts.js";
import CustomError from "../middlewares/errors/CustomError.js";
import { EErrors } from "../middlewares/errors/EErrors.js";
import { transporter } from "../utils/utils.js";
const getProducts = async (req, res) => {
  const pageQuery = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const query = req.query.query;
  const queryValue = req.query.queryValue;
  const sort = req.query.sort || "asc";
  try {
    if (configs.persistence === "MONGO") {
      const {
        docs,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
      } = await getProductsService(query, queryValue, limit, pageQuery, sort);
      const prevLink = hasPrevPage
        ? `/products?page=${prevPage}&limit=${limit}`
        : null;
      const nextLink = hasNextPage
        ? `/products?page=${nextPage}&limit=${limit}`
        : null;
      return res.status(200).send({
        status: "success",
        payload: [...docs],
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    } else {
      const products = await getProductsService();
      return res.status(200).send({ status: "success", payload: products });
    }
  } catch (error) {
    throw CustomError.createError({
      name: "error",
      message: error.message,
      cause: error.cause,
      code: EErrors.INTERNAL_SERNVER_ERROR,
    });
  }
};
const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProductService(id);
    if (!product) {
      req.logger.error("product not found");
      throw CustomError.createError({
        name: "error",
        message: "product not found",
        cause: "the product id given was not found",
        code: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    throw CustomError.createError({
      name: "error",
      message: error.message,
      cause: error.cause,
      code: EErrors.INTERNAL_SERNVER_ERROR,
    });
  }
};
const getMockingProducts = async (req, res) => {
  try {
    const products = generateProducts();
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    throw CustomError.createError({
      name: "error",
      message: error.message,
      cause: error.cause,
      code: EErrors.INTERNAL_SERNVER_ERROR,
    });
  }
};
const addProduct = async (req, res) => {
  const user = req.user;
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      req.logger.error("invalid data types");
      throw CustomError.createError({
        name: "error",
        message: "invalid data types",
        cause: "a campus its missing",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }
    const product = await addProductService({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
      owner: user.role === "premium" ? user.email : "admin",
    });
    res.status(201).send({ status: "success", payload: product });
  } catch (error) {
    throw CustomError.createError({
      name: "error",
      message: error.message,
      cause: error.cause,
      code: EErrors.INTERNAL_SERNVER_ERROR,
    });
  }
};
const uptadeProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      req.logger.error("invalid data types");
      throw CustomError.createError({
        name: "error",
        message: "invalid data types",
        cause: "a campus its missing",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }
    const productRes = await uptadeProductService(id, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    });
    res.status(200).send({ status: "success", payload: productRes });
  } catch (error) {
    throw CustomError.createError({
      name: "error",
      message: error.message,
      cause: error.cause,
      code: EErrors.INTERNAL_SERNVER_ERROR,
    });
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    const base = await getProductService(id);
    if (!base) {
      throw CustomError.createError({
        name: "error",
        message: "product not found",
        cause: "the product wasnt found",
        code: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    if (user.role === "premium" && base.owner != user.email) {
      req.logger.error("invalid credentials");
      throw CustomError.createError({
        name: "error",
        message: "invalid credentials",
        cause: "you are not the owner of the product that you want to delete",
        code: EErrors.INVALID_CREDENTIALS,
      });
    }
    const response = await deleteProductService(id);
    if (user.role === "premium") {
      await transporter.sendMail({
        from: "Candela Mena e-commerce",
        to: user.email,
        subject: "producto eliminado",
        html: `
          <h1>product eliminado<h1/>
          <p>el producto que el usuario premium ${user.email} ha creado fue eliminado</p>
          `,
        attachments: [],
      });
    }
    res.status(200).send({ status: "success", payload: response });
  } catch (error) {
    throw CustomError.createError({
      name: "error",
      message: error.message,
      cause: error.cause,
      code: EErrors.INTERNAL_SERNVER_ERROR,
    });
  }
};
export {
  getProduct,
  getProducts,
  getMockingProducts,
  addProduct,
  uptadeProduct,
  deleteProduct,
};
