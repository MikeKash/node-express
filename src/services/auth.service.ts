import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateAccessToken = (username: string, tokenKey: string) => {
  return jwt.sign(username, tokenKey);
};

const passwordHash = (plainPassword: string): string => {
  const hash = bcrypt.hashSync(plainPassword, 10);
  return hash;
};

const comparePassword = (plainPassword: string, passwordHash: string): boolean => {
  const compared = bcrypt.compareSync(plainPassword, passwordHash);
  return compared;
};

const authService = { generateAccessToken, passwordHash, comparePassword };

export default authService;
