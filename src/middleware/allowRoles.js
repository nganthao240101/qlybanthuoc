import { verifyToken } from "../api/auth/verifyToken";
import { ROLES } from "../constants";
import { allowRoles } from "../helpers/allowRoles";

export const allowRolesMiddleware = (roles) => {
  return (req, res, next) => {
    const { token } = req.body;
    const dataDecoded = verifyToken(token);

    if (!token && allowRoles(ROLES.GUEST, roles)) {
      next();
    } else if (allowRoles(dataDecoded.role, roles)) {
      req.user = dataDecoded;
      next();
    }

    return res.json(403);
  };
};
