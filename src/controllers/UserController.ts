import { Request, Response } from "express";

export class UserController {
  async me(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ usuario: req.usuario });
  }
}