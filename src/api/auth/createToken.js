import JWT from "jsonwebtoken";
export const createToken = (payload) =>
  JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET);
