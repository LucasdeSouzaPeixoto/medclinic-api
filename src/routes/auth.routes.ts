import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const authRoutes = Router();
const usuarioController = new UsuarioController();

authRoutes.post("/register", (req, res, next) => usuarioController.cadastrar(req, res, next));
authRoutes.post("/login", (req, res, next) => usuarioController.login(req, res, next));

export default authRoutes;