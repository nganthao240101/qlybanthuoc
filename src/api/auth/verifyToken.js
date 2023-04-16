import JWT from "jsonwebtoken";
export const verifyToken = (token) =>
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
