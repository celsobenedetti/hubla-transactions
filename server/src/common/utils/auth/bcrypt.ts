import * as bcrypt from "bcrypt";

const SALT = 10;

export const hashString = async (s: string) => {
  return bcrypt.hash(s, SALT);
};

export const compareHash = async (data: string, hash: string) => {
  return bcrypt.compare(data, hash);
};
