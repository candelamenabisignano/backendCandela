import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("probando modulo de carritos", () => {
    let cartId;
    it("el metodo GET en el endpoint /api/carts debe tener una peticion exitosa con una respuesta de tipo array", async () => {
      const result = await requester.get("/api/carts");
  
      expect(result.statusCode).to.be.equal(200);
      expect(Array.isArray(result._body.payload)).to.be.true;
    });
  
    it("el metodo POST en el endpoint /api/carts debe crear un carrito correctamente en la BDD", async () => {
      const cartMock = {
        product: "65c84103dfcee926395697ea",
        quantity: 20,
      };
  
      const { _body, statusCode } = await requester
        .post("/api/carts")
        .send(cartMock);
  
      expect(statusCode).to.be.equal(201);
      expect(typeof _body.payload).to.be.equal("object");
      expect(_body.payload).to.have.property("_id");
      cartId = _body.payload._id;
    });
  
    it("el metodo GET en el endpoint /api/carts/:cid debe encontrar el carrito correctamente en la BDD", async () => {
      const { _body, statusCode } = await requester.get(`/api/carts/${cartId}`);
  
      let id = _body.payload._id.split("(") + ")";
  
      expect(statusCode).to.be.equal(200);
      expect(typeof _body.payload).to.be.equal("object");
      expect(_body.payload).to.have.property("_id");
      expect(id).to.be.equal(cartId + ")");
    });
    it("el metodo PUT en el endpoint /api/carts/:cid debe actualizar el carrito seleccionado correctamente", async () => {
      const cartUptadeMock = {
        products: [
          {
            product: "65c84103dfcee926395697ea",
            quantity: 3,
          },
        ],
      };
  
      const { _body, statusCode } = await requester.put(`/api/carts/${cartId}`).send(cartUptadeMock);
      expect(statusCode).to.be.equal(200);
      expect(typeof _body.payload).to.be.equal("object");
      console.log(_body.payload.products);
      expect(Array.isArray(_body.payload.products)).to.be.true;
      expect(_body.payload._id).to.be.equal(cartId);
      expect(_body.payload.products[0].quantity).to.be.equal(
        cartUptadeMock.products[0].quantity
      );
    });
  
    it("el metodo DELETE en el endpoint /api/carts/:cid debe vaciar el carrito seleccionado de la BDD correctamente", async () => {
      const { statusCode } = await requester.delete(`/api/carts/${cartId}`);
      const { _body } = await requester.get(`/api/carts/${cartId}`);
      expect(statusCode).to.be.equal(200);
      expect(Array.isArray(_body.payload.products)).to.be.true;
      expect(_body.payload.products.length).to.be.equal(0);
    });
  });
