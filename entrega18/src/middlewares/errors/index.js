import { EErrors } from "./EErrors.js";
export default (error, req, res, next) => {
  switch (error.code) {
    case EErrors.ROUTING_ERROR:
      res
        .status(404)
        .send({
          status: "error",
          error: error.name,
          description: error.description,
          cause: error.cause,
        });
    case EErrors.PRODUCT_NOT_FOUND:
      res
        .status(404)
        .send({
          status: "error",
          error: error.name,
          description: error.description,
          cause: error.cause,
        });
    case EErrors.INVALID_TYPE_ERROR:
      res
        .status(400)
        .send({
          status: "error",
          error: error.name,
          description: error.description,
          cause: error.cause,
        });
    case EErrors.INTERNAL_SERNVER_ERROR:
      res
        .status(500)
        .send({
          status: "error",
          error: error.name,
          description: error.description,
          cause: error.cause,
        });
    case EErrors.INVALID_CREDENTIALS:
      res
        .status(401)
        .send({
          status: "error",
          error: error.name,
          description: error.description,
          cause: error.cause,
        });
    default:
      res
        .status(500)
        .send({
          status: "error",
          error: error.name,
          description: error.description,
          cause: error.cause,
        });
  }
  next();
};
