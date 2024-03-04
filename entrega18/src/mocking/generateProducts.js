import { fakerES as faker } from "@faker-js/faker";
export const generateProducts = () => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    let num = faker.number.int({ max: 3 });
    let product = {
      title: faker.commerce.productName,
      description: faker.commerce.productDescription,
      code: faker.string.alphanumeric(10),
      price: faker.commerce.price(),
      status: faker.datatype.boolean(),
      stock: faker.number.int({ min: 1, max: 20 }),
      category: faker.commerce.department(),
      thumbnail: [],
      availability: faker.datatype.boolean(),
    };
    for (let l = 0; l < num; l++) {
      product.thumbnail.push(faker.image.url());
    }
    products.push(product);
  }
  return products;
};
