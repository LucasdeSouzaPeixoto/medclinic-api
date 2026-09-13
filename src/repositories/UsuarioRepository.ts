import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entities/Usuario";

export const UsuarioRepository = AppDataSource.getRepository(Usuario).extend({
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.findOneBy({ email });
  },
});