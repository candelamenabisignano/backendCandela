import configs from "../config.js";
import {
  getProductService,
  getProductsService,
  addProductService,
  uptadeProductService,
  deleteProductService,
} from "../services/products.service.js";
import {generateProducts} from "../mocking/generateProducts.js";
import CustomError from '../middlewares/errors/CustomError.js';
import { EErrors } from "../middlewares/errors/EErrors.js";

const handlePolicies = (policies) => (req, res, next) => {
  const user = req.user;
  if (user.role != policies)
    return res.status(404).send({ status: "error", error: "no policies" });
  next();
};

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
      return res
        .status(200)
        .send({
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
    throw CustomError.createError({name:'error', message:error.message, cause:error.cause, code:EErrors.INTERNAL_SERNVER_ERROR})
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProductService(id);

    if(!product){
      req.logger.error('product not found')
      throw CustomError.createError({name:'error', message:'product not found', cause:'the product id given was not found', code:EErrors.PRODUCT_NOT_FOUND});
    }
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    throw CustomError.createError({name:'error', message:error.message, cause:error.cause, code:EErrors.INTERNAL_SERNVER_ERROR})
  }
};

const getMockingProducts=async(req,res) =>{
  try {
    const products= generateProducts();
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    throw CustomError.createError({name:'error', message:error.message, cause:error.cause, code:EErrors.INTERNAL_SERNVER_ERROR})
  }
}

const addProduct = async (req, res) => {
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
      req.logger.error('invalid data types')
      throw CustomError.createError({name:'error', message:'invalid data types', cause:'a campus its missing', code:EErrors.INVALID_TYPE_ERROR});
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
    });

    res.status(201).send({ status: "success", payload: product });
  } catch (error) {
    throw CustomError.createError({name:'error', message:error.message, cause:error.cause, code:EErrors.INTERNAL_SERNVER_ERROR})
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
      id,
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
      req.logger.error('invalid data types')
      throw CustomError.createError({name:'error', message:'invalid data types', cause:'a campus its missing', code:EErrors.INVALID_TYPE_ERROR});
    }

    const product = await uptadeProductService(id, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    });

    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    throw CustomError.createError({name:'error', message:error.message, cause:error.cause, code:EErrors.INTERNAL_SERNVER_ERROR});
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteProductService(id);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    throw CustomError.createError({name:'error', message:error.message, cause:error.cause, code:EErrors.INTERNAL_SERNVER_ERROR});
  }
};

export {
  getProduct,
  getProducts,
  getMockingProducts,
  addProduct,
  uptadeProduct,
  deleteProduct,
  handlePolicies,
};
