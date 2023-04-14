import JWT from "jsonwebtoken";
export const verifyToken = async (token) =>
  await JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
