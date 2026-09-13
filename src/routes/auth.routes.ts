import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const authRoutes = Router();
const usuarioController = new UsuarioController();

authRoutes.post("/register", (req, res) => usuarioController.cadastrar(req, res));
authRoutes.post("/login", (req, res) => usuarioController.login(req, res));

export default authRoutes;