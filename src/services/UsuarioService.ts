import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { CreateUsuarioDTO } from "../dtos/CreateUsuarioDTO";
import { Usuario } from "../entities/Usuario";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { generateToken } from "../utils/jwtUtils";
import { LoginDTO } from "../dtos/LoginDTO";

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

  async login(dados: LoginDTO): Promise<{ token: string }> {
  const { email, senha } = dados;

  if (!email || !senha) {
    throw new Error("Email e senha sao obrigatorios.");
  }

  const usuario = await UsuarioRepository.findByEmail(email);
  if (!usuario) {
    throw new Error("Credenciais invalidas.");
  }

  const senhaValida = await comparePassword(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error("Credenciais invalidas.");
  }

  const token = generateToken({ id: usuario.id, role: usuario.role });

  return { token };
}
}