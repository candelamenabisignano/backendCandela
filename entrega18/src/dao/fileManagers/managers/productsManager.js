import fs from "fs";
import { v4 as uuidv4 } from "uuid";
export default class ProductsFS {
  constructor(path) {
    this.path = path;
  }
  get = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  };
  getById = async (id) => {
    const products = await this.get();
    const find = products.find((p) => p.id == id);
    return find;
  };
  add = async (product) => {
    const products = await this.get();
    product.id = uuidv4();
    product.status = true;
    products.push(product);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return product;
  };
  delete = async (id) => {
    const product = await this.getById(id);
    const products = await this.get();
    const index = products.findIndex((p) => p.id === product.id);
    products.splice(index, 1);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return products;
  };
  uptade = async (id, newProduct) => {
    const products = await this.get();
    let product = await this.getById(id);
    product = { ...newProduct, id };
    let productIndex = products.findIndex((p) => p.id == id);
    products[productIndex] = product;
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return product;
  };
}
