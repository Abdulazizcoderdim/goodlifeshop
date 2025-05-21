import { BaseError } from "../errors/base.error.js";

export function errorMiddleware(err, req, res, next) {
  if (err instanceof BaseError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: err.message });
}
