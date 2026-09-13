import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret) as TokenPayload;
}