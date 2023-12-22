import { productModel } from "../models/product.model.js";

export default class ProductsDB {
  constructor() {
    console.log("working products from DB");
  }

  get = async (query, queryValue, limitNumber, pageNumber, sortValue) => {
    const hasQueries = query && queryValue ? { [query]: queryValue } : {};

    const result = await productModel.paginate(
      { ...hasQueries },
      {
        limit: limitNumber,
        page: pageNumber,
        sort: { price: sortValue },
        lean: true,
      }
    );
    return result;
  };

  getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
  };

  add = async (product) => {
    const productRes = await productModel.create(product);
    return productRes;
  };

  delete = async (id) => {
    await productModel.deleteOne({ _id: id });
    const productRes = await productModel.find().lean();
    return productRes;
  };

  uptade = async (id, product) => {
    const productRes = await productModel.updateOne({ _id: id }, product);
    return productRes;
  };
}
