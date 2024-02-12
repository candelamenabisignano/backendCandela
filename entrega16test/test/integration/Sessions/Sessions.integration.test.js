import { expect } from "chai";
import supertest from "supertest";
import { fa, fakerES as faker } from "@faker-js/faker";
const requester = supertest("http://localhost:8080");

describe("probando modulo de carritos", () => {
  it("el metodo GET en el endpoint /api/sessions debe retornar una respuesta exitosa de tipo arreglo", async () => {
    const { _body, statusCode } = await requester.get("/api/sessions");
    expect(statusCode).to.be.equal(200);
    expect(Array.isArray(_body.payload)).to.be.true;
  });

  it("el metodo POST en el endpoint /api/sessions/register debe registrar un usuario exitosamente", async () => {
    const mockUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 10, max: 70 }),
      password: "1234",
      cart: "65ca760ad20b5615945eff49",
    };

    const peticion = await requester.post("/api/sessions/register").send(mockUser);
    expect(peticion.statusCode).to.be.equal(201);
    expect(typeof peticion._body.payload).to.be.equal("object");
    expect(peticion._body.message).to.be.equal('user registered');
    expect(peticion._body.payload).to.have.property("_id");
  });

  it("el metodo POST en el endpoint /api/sessions/login debe loguear un usuario exitosamente", async () => {
    let cookie;
    const mockUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 10, max: 70 }),
      password: "1234",
      cart: "65ca760ad20b5615945eff49",
    };

    const register = await requester.post("/api/sessions/register").send(mockUser);

    const userToLogin = {
      email: register._body.payload.email,
      password: mockUser.password,
    };

    const login = await requester.post("/api/sessions/login").send(userToLogin);
    expect(login.statusCode).to.be.equal(201);
    expect(typeof login._body.payload).to.be.equal("object");
    expect(login._body.payload).to.have.property("_id");

    const cookieResult = login.headers["set-cookie"][0];
    expect(cookieResult).to.be.ok;

    const cookieSplited = cookieResult.split("=");
    cookie = {
      name: cookieSplited[0],
      value: cookieSplited[1],
    };

    expect(cookie.name).to.be.ok.and.to.be.equal("tokenCookie");
    expect(cookie.value).to.be.ok;
  });
});
