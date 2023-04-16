import { verifyToken } from "../api/auth/verifyToken";
import { ROLES } from "../constants";
import { allowRoles } from "../helpers/allowRoles";

const getTokenFromRequest = (req) =>
  req.headers?.authorization && req.headers?.authorization.split(" ")[1];

export const allowRolesMiddleware = (roles) => {
  return (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token && allowRoles(ROLES.GUEST, roles)) {
      return next();
    } else {
      // token encode by user.
      // token from login and register.
      const dataDecoded = verifyToken(token);

      if (allowRoles(dataDecoded?.role, roles)) {
        req.tokenDecoded = dataDecoded;
        return next();
      }
    }

    return res.json(403);
  };
};
