// plugins/errorHandler.ts
import { Elysia } from "elysia";
import { AppError } from "../utils/error";

export const errorHandler = () =>
  new Elysia().onError(({ code, error, set }) => {
    console.error(error);

    // Handle your custom AppError
    if (error instanceof AppError) {
      set.status = error.status;
      return {
        status: error.status,
        message: error.message,
      };
    }

    // Handle validation errors (TypeBox / Elysia)
    if (code === "VALIDATION") {
      set.status = 400;
      return {
        status: 400,
        message: "Validation failed",
        details: error.all ?? error.message, // `all` gives all field errors
      };
    }

    // Handle "not found" routes
    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        status: 404,
        message: "Route not found",
      };
    }

    // Fallback for anything else
    return {
      status: 500,
      message: "Internal server error",
    };
  });
