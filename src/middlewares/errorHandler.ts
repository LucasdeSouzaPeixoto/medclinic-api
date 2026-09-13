import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ erro: error.message });
  }

  console.error("Erro nao tratado:", error);

  return res.status(500).json({ erro: "Erro interno do servidor." });
}