import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/enums/UserRole";

export function roleMiddleware(...rolesPermitidas: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).json({ erro: "Usuario nao autenticado." });
    }

    if (!rolesPermitidas.includes(usuario.role as UserRole)) {
      return res.status(403).json({ erro: "Acesso negado para este perfil." });
    }

    return next();
  };
}