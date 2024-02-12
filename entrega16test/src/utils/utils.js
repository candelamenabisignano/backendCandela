import { fileURLToPath } from "url"; // obtiene la ruta de la consola
import path from "path"; // traduce la ruta obtenida
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "../config.js";

const __filename = fileURLToPath(import.meta.url); //obteniendo la url de forma especifica
const __dirname = path.dirname(__filename);
const __mainDirname= path.join(__dirname, "..", "..");
const PRIVATE_KEY = configs.privateKey;

const generateToken = (user) => {
  //lo que vamos a meter a ese JWT
  const token = jwt.sign(
    { user /*contenido del token*/ },
    PRIVATE_KEY /*firmamos la token*/,
    { expiresIn: "1h" } /*tiempo de vida de la token */
  ); //creamos en token
  return token;
};

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValid = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

export { __mainDirname,__dirname, createHash, isValid, generateToken, PRIVATE_KEY };
