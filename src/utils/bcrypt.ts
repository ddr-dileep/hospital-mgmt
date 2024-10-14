import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
