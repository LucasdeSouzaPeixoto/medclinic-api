import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { CreateUsuarioDTO } from "../dtos/CreateUsuarioDTO";
import { Usuario } from "../entities/Usuario";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { generateToken } from "../utils/jwtUtils";
import { LoginDTO } from "../dtos/LoginDTO";
import { AppError } from "../utils/AppError";

export class UsuarioService {
  async cadastrar(dados: CreateUsuarioDTO): Promise<Usuario> {
    const { nome, email, senha } = dados;
    const emailNormalizado = email.toLowerCase().trim();

    if (!nome || !email || !senha) {
      throw new AppError("Nome, email e senha sao obrigatorios.", 400);
}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
     throw new AppError("Formato de email invalido.", 400);
}

    const usuarioExistente = await UsuarioRepository.findByEmail(emailNormalizado);
    if (usuarioExistente) {
      throw new AppError("Email ja cadastrado.", 409); // 409 = Conflict
}

    if (senha.length < 6) {
      throw new AppError("A senha deve ter no minimo 6 caracteres.", 400);
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
  const emailNormalizado = email.toLowerCase().trim();

  if (!email || !senha) {
    throw new AppError("Email e senha sao obrigatorios.", 400);
}

  const usuario = await UsuarioRepository.findByEmail(emailNormalizado);
  if (!usuario) {
    throw new AppError("Credenciais invalidas.", 401);
}

  const senhaValida = await comparePassword(senha, usuario.senha);
  if (!senhaValida) {
    throw new AppError("Credenciais invalidas.", 401);
}

  const token = generateToken({ id: usuario.id, role: usuario.role });

  return { token };
}
}