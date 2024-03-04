import { Products } from "../dao/factory.js";
import ProductsRepository from "../repository/products.repository.js";
import configs from "../config.js";
import { __dirname } from "../utils/utils.js";
const ProductsDao =
  configs.persistence === "FS"
    ? new Products(`${__dirname}/dao/fileManagers/files/products.json`)
    : new Products();
const manager = new ProductsRepository(ProductsDao);
const getProductsService = async (
  query,
  queryValue,
  limitNumber,
  pageNumber,
  sortValue
) => {
  const products =
    configs.persistence === "MONGO"
      ? await manager.getRepository(
          query,
          queryValue,
          limitNumber,
          pageNumber,
          sortValue
        )
      : await manager.getRepository();
  return products;
};
const getProductService = async (id) => {
  const product = await manager.getByIdRepository(id);
  return product;
};
const addProductService = async (product) => {
  const newProduct = await manager.addRepository(product);
  return newProduct;
};
const uptadeProductService = async (id, product) => {
  const newProduct = await manager.uptadeRepository(id, product);
  return newProduct;
};
const deleteProductService = async (id) => {
  const products = await manager.deleteRepository(id);
  return products;
};
export {
  getProductService,
  getProductsService,
  addProductService,
  uptadeProductService,
  deleteProductService,
};
