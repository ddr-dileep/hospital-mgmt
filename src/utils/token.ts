import jwt from "jsonwebtoken";

export const generateToken = async (data: any) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });
  return token;
};
