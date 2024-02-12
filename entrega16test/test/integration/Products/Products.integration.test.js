import { expect } from "chai";
import supertest from "supertest";
import {fakerES as faker} from "@faker-js/faker";
import {v4 as uuidv4} from 'uuid';
const requester = supertest("http://localhost:8080");

describe("probando modulo de carritos", () => {
  let productId= '65c84103dfcee926395697ea';

  it("el metodo GET en el endpoint /api/products debe tener una peticion exitosa con una respuesta de tipo array", async () => {
    const result = await requester.get("/api/products");

    expect(result.statusCode).to.be.equal(200);
    expect(Array.isArray(result._body.payload)).to.be.true;
  });

  it("el metodo POST en el endpoint /api/products debe retornar un 401 debido a que no hay un login de un admin y por lo tanto los permisos para crear un producto no son los suficientes", async () => {
    const productMock = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription,
      code: uuidv4(),
      price: faker.commerce.price(),
      status: faker.datatype.boolean(),
      stock: faker.number.int({max:50}),
      category: faker.commerce.department(),
      thumbnail: [],
      availability: faker.datatype.boolean(),
      owner: 'jaja@gmail.com',
    };

    const {_body,statusCode} = await requester.post("/api/products").send(productMock);
    expect(statusCode).to.be.equal(401);
    expect(_body).to.be.undefined;
  });

  it('el metodo GET en el endpoint /api/products/:pid debe encontrar el producto correctamente en la BDD', async()=>{

    const {_body, statusCode}= await requester.get(`/api/products/${productId}`);

    expect(statusCode).to.be.equal(200);
    expect(typeof _body.payload).to.be.equal('object');
    expect(_body.payload).to.have.property("_id");
    expect(_body.payload._id).to.be.equal(productId);
    expect(_body.payload.code).to.be.equal('123456791-21134445');
});

it('el metodo PUT en el endpoint /api/products/:pid debe retornar un 401 debido a que no hay un login de un admin o un usuario premium y por lo tanto los permisos para actualizar un producto no son los suficientes', async()=>{

    const peticion= await requester.get(`/api/products/${productId}`);
    const comparePorduct=peticion._body.payload;

    const productUptadeMock= {
        ...comparePorduct,
        thumbnail:['../hola.jpg']
    };

    const {_body, statusCode}= await requester.put(`/api/products/${productId}`).send(productUptadeMock);
    expect(statusCode).to.be.equal(401);
    expect(_body).to.be.undefined;
});
it('el metodo DELETE en el endpoint /api/products/:pid debe retornar un 401 debido a que no hay un login de un admin o un usuario premium y por lo tanto los permisos para actualizar un producto no son los suficientes', async()=>{

    const {_body, statusCode}= await requester.delete(`/api/products/${productId}`);
    const peticion= await requester.get(`/api/products/${productId}`);
    expect(statusCode).to.be.equal(401);
    expect(peticion.statusCode).to.be.equal(200);
    expect(_body).to.be.undefined;
});
});
