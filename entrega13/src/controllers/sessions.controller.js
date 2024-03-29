import { createHash, generateToken } from "../utils.js";
import {
  getUsersService,
  getUserService,
  registerService,
} from "../services/sessions.service.js";

const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    res.send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } =
      req.body;

    const user = await getUserService(email);

    if (user != null || undefined) {
      req.logger.error("an user has already registered with this email")
      return res
        .status(400)
        .send({
          status: "error",
          error: "an user has already registered with this email",
        });
    }

    if (
      !first_name ||
      !last_name ||
      !email ||
      !age ||
      !password ||
      !cart ||
      !role
    ) {
      req.logger.error('campus incomplete')
      return res
        .status(400)
        .send({ status: "error", error: "campus incomplete" });
    }

    await registerService({
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
      password: createHash(password),
      cart: cart,
      role: role,
    });
    return res
      .status(201)
      .send({
        status: "success",
        message: "user registered",
        payload: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          age: age,
          password: createHash(password),
          cart: cart,
          role: role,
        },
      });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, ...passwordConst } = req.body;

    const user = await getUserService(email);

    if (!user) {
      req.logger.error('invalid credentials')
      return res.status(401).send({ status: "error", error: "invalid credentials" });
    }

    const { password: _, ...userToken } = user;

    const token = generateToken(userToken);

    return res
      .cookie("tokenCookie", token, { maxAge: 100 * 100 * 100, httpOnly: true })
      .send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const current = (req, res) => {
  try {
    if (req.user === (undefined || null)) {
      req.logger.error('user not found')
      return res.status(400).send({ status: "error", error: "user not found" });
    }
    req.user = req.user;
    return res.send({ status: "success", payload: req.user });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const github = (req, res) => {
  res.status(201).send({ status: "success", message: "user registered" });
};

const githubCallBack = (req, res) => {
  req.user = req.user;
  res.redirect("/products");
};

const logout = async (req, res) => {
  try {
    const cookie = req.cookies["tokenCookie"];
    if (!cookie) {
      req.logger.error('cookie not found')
      return res
        .status(400)
        .send({ status: "error", error: "cookie not found" });
    }

    req.user = null;
    res.clearCookie("tokenCookie");
    res.redirect("/products");
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export { getUsers, register, login, current, github, githubCallBack, logout };
