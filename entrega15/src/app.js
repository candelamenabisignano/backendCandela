import express from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { __dirname, __mainDirname } from "./utils/utils.js";
import { initializePassport } from "./config/passport.config.js";
import configs from "./config.js";
import { Server } from "socket.io";
import errorHandler from './middlewares/errors/index.js';
import { addLogger } from "./utils/logger.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(addLogger)
app.use(errorHandler);
app.use(cookieParser());

const swaggerOptions={
  definition:{
      openapi:'3.0.1', //version de open api que usaremos, esta definira como nosotros vamos a escribir el json/yaml
      info:{
          title:"Documentacion del proyecto de e-commerce Candela Mena Coderhouse",
          description:"API pensada para la compra y venta de productos"
      }
  },
  apis:[`${__mainDirname}/docs/**/*.yaml`]/*ruta de la cual vamos a estar leyendo el archivo json/yaml*/
  //estamos indicando que, dentro de la carpeta docs queremos acceder a cualquier carpeta y a cualquier archivo que sea .yaml,
  //hay que cambiar el dirname porque la ruta empieza desde src y nosotros queremos que empiece desde recursosBackend-Adoptme
};

app.use("/", viewsRouter);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJsdoc(swaggerOptions)));
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


initializePassport();
app.use(passport.initialize());
const server = app.listen(configs.port, () => console.log("server running"));

const socketServer = new Server(server);

const messages = [];
socketServer.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("message", (data) => {
    messages.push(data);
    console.log(messages);
    socket.emit("messages", messages);
  });
});
export { messages };
