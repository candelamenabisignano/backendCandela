import express from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import { initializePassport } from "./config/passport.config.js";
import configs from "./config.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(cookieParser());

app.use("/", viewsRouter);
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
