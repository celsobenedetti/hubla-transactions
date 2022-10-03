import * as jwt from "jsonwebtoken";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";

const SECRET = process.env.JWT_SECRET + "";

export const createJwt = (userInfo: { id: number; username: string }) => {
  const { id, username } = userInfo;
  return jwt.sign({ id, username }, SECRET, { expiresIn: "30d" });
};

export const decodeJwt = (token: string) => {
  return jwt.verify(token, SECRET) as JwtPayload;
};
