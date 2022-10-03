import { Request } from "express";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";

export interface SignedUserReq extends Request {
  user: JwtPayload;
}
