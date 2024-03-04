import { fileURLToPath } from "url";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "../config.js";
import nodemailer from "nodemailer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __mainDirname = path.join(__dirname, "..", "..");
const PRIVATE_KEY = configs.privateKey;
const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValid = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
const calculateDate = (actual, user) => {
  const lastConnection = user.split(",");
  const fechaAñoMesDia = lastConnection[0].split("/");
  const hora = lastConnection[1].split(":");
  let fechaUser = new Date(
    fechaAñoMesDia[2],
    fechaAñoMesDia[1] - 1,
    fechaAñoMesDia[0],
    hora[0],
    hora[1],
    hora[2]
  );
  const diferenciaTiempo = actual - fechaUser;
  const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
  return diferenciaDias;
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "candelamenabisignano07@gmail.com",
    pass: "kdtnvoyxbyjarwnq",
  },
});
export {
  __mainDirname,
  __dirname,
  createHash,
  isValid,
  generateToken,
  PRIVATE_KEY,
  calculateDate,
  transporter,
};
