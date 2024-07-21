import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "express";
import { Users } from "../models/User";
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "Authentication required" });

  const SECRET: string = process.env.JWT_SECRET || "mystring";
  try {
    const verifiedToken = jwt.verify(token, SECRET) as JwtPayload;
    const user = Users.find(
      (user) =>
        verifiedToken.email === user.email &&
        verifiedToken.id === user.id &&
        verifiedToken.name === user.name
    );

    if (!user) throw new Error("User not found");

    (req as any).user = user; 
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
