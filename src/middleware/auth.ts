import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwtsecret as string
      ) as JwtPayload & { id: string; role: string };
    console.log("DECODED USER IN AUTH ===>", decoded);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      next();
    } catch (err: any) {
      return res.status(401).json({
        message: err.message,
      });
    }
  };
};

export default auth;
