// plugins/errorHandler.ts
import { Elysia } from "elysia";
import { AppError } from "../utils/error";

export const errorHandler = () =>
  new Elysia().onError(({ code, error }) => {
    // Handle your custom AppError
    if (error instanceof AppError) {
      return {
        status: error.status,
        message: error.message,
      };
    }

    // Handle validation errors (TypeBox / Elysia)
    if (code === "VALIDATION") {
      return {
        status: 400,
        message: "Validation failed",
        details: error.all ?? error.message, // `all` gives all field errors
      };
    }

    // Handle "not found" routes
    if (code === "NOT_FOUND") {
      return {
        status: 404,
        message: "Route not found",
      };
    }

    // Fallback for anything else
    return {
      status: 500,
      message: error?.message ?? "Internal server error",
    };
  });
