import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token nao fornecido." });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ erro: "Token nao fornecido." });
  }

  try {
    const payload = verifyToken(token);
    req.usuario = { id: payload.id, role: payload.role };
    return next();
  } catch (error) {
    return res.status(401).json({ erro: "Token invalido ou expirado." });
  }
}