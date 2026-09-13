import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {
  async cadastrar(req: Request, res: Response): Promise<Response> {
    try {
      const usuario = await usuarioService.cadastrar(req.body);

      const { senha, ...usuarioSemSenha } = usuario;

      return res.status(201).json(usuarioSemSenha);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : "Erro desconhecido.";
      return res.status(400).json({ erro: mensagem });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
  try {
    const resultado = await usuarioService.login(req.body);
    return res.status(200).json(resultado);
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : "Erro desconhecido.";
    return res.status(401).json({ erro: mensagem });
  }
}
}