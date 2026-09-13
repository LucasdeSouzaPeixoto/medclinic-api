import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const app = express();
app.use(express.json());

import authRoutes from "./routes/auth.routes";
// ...
app.use("/auth", authRoutes);

import userRoutes from "./routes/user.routes";
// ...
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });