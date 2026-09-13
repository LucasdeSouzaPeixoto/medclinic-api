import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {
  async cadastrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await usuarioService.cadastrar(req.body);
      const { senha, ...usuarioSemSenha } = usuario;
      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resultado = await usuarioService.login(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }
}