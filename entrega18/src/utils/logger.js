import configs from "../config.js";
import winston from "winston";
const customLevelOptions = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};
const ENVIROMENT = configs.enviroment;
let logger;
if (ENVIROMENT === "DEVELOPMENT") {
  logger = winston.createLogger({
    levels: customLevelOptions,
    transports: [
      new winston.transports.Console({
        level: "debug",
      }),
      new winston.transports.File({
        level: "error",
        filename: "errors/errors.log",
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevelOptions,
    transports: [
      new winston.transports.Console({
        level: "info",
      }),
      new winston.transports.File({
        level: "error",
        filename: "errors/errors.log",
      }),
    ],
  });
}
export const addLogger = (req, res, next) => {
  req.logger = logger; //en el objeto request almacenamos nuestro logger
  next();
};
