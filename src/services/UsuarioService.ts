import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { hashPassword } from "../utils/passwordUtils";
import { CreateUsuarioDTO } from "../dtos/CreateUsuarioDTO";
import { Usuario } from "../entities/Usuario";

export class UsuarioService {
  async cadastrar(dados: CreateUsuarioDTO): Promise<Usuario> {
    const { nome, email, senha } = dados;

    if (!nome || !email || !senha) {
      throw new Error("Nome, email e senha sao obrigatorios.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Formato de email invalido.");
    }

    const usuarioExistente = await UsuarioRepository.findByEmail(email);
    if (usuarioExistente) {
      throw new Error("Email ja cadastrado.");
    }

    const senhaCriptografada = await hashPassword(senha);

    const novoUsuario = UsuarioRepository.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return UsuarioRepository.save(novoUsuario);
  }
}