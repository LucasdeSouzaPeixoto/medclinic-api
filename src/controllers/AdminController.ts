import { Request, Response } from "express";

export class AdminController {
  async ping(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ mensagem: "Pong! Acesso de administrador confirmado." });
  }
}