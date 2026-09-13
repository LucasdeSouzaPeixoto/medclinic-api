import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET nao configurado no .env");
}

export function generateToken(payload: TokenPayload): string {
  const secret = JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload {
  const secret = JWT_SECRET as string;
  return jwt.verify(token, secret) as TokenPayload;
}