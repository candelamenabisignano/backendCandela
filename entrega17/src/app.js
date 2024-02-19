import express from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from './routes/users.router.js';
import { __dirname, __mainDirname } from "./utils/utils.js";
import { initializePassport } from "./config/passport.config.js";
import configs from "./config.js";
import { Server } from "socket.io";
import errorHandler from './middlewares/errors/index.js';
import { addLogger } from "./utils/logger.js";
import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

let options={
  definition:{
      openapi:'3.0.1', 
      info:{
          title:"Documentacion del proyecto de adopcion de mascotas clase 39",
          description:"API pensada para resolver el proceso de adopcion de mascotas"
      }
  },
  apis:[`${__mainDirname}/docs/**/*.yaml`]
}

const app = express();
let spects= swaggerJSdoc(options)
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spects));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(addLogger)
app.use(errorHandler);
app.use(cookieParser());

app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


initializePassport();
app.use(passport.initialize());
const server = app.listen(configs.port, () => console.log("server running"));

const socketServer = new Server(server);
console.log(__dirname)
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
