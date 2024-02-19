import dotenv from "dotenv";

dotenv.config();

const configs = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  mongoUrlTest: process.env.MONGO_URL_TEST,
  privateKey: process.env.PRIVATE_KEY,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  persistence: process.env.PERSISTENCE,
  enviroment: process.env.ENVIROMENT
};

export default configs;
