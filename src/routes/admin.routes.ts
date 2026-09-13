import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UserRole } from "../entities/enums/UserRole";
import { AdminController } from "../controllers/AdminController";

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.get(
  "/ping",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  (req, res) => adminController.ping(req, res)
);

export default adminRoutes;