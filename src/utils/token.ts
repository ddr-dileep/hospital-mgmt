import jwt from "jsonwebtoken";

export const generateToken = async (data: any) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });
  return token;
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
