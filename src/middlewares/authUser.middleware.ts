import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err, decoded: any) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = {
        email: decoded.email,
        userId: decoded.sub,
        isAdm: decoded.isAdm,
        isActive: decoded.isActive,
      };
      return next();
    }
  );
};
