import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Users } from "../models/User";

let GLOBAL_ID = 0;

export class Auth {
  static  login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const verifiedUser = Users.find(
        (user) => user.email === email && user.password === password
      );

      if (!verifiedUser) {
        return res.status(400).json({ msg: "Wrong Credentials" });
      }

      const { password: _, ...userWithoutPassword } = verifiedUser;

      const SECRET: string = process.env.JWT_SECRET || "mystring";
      const token = jwt.sign(userWithoutPassword, SECRET, { expiresIn: "1m" });
      res.status(200).json({token : token});
    } catch (error) {
      res.status(500).json({ msg: "Server error", error });
    }
  }

  static  register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const existingUser = Users.find((user) => {
        if (
          user.email === email &&
          user.name === name &&
          user.password === password
        )
          return user;
      });

      if (existingUser)
        return res.status(400).json({ msg: "User already exist" });

      const id = GLOBAL_ID++;
      Users.push({ name, email, password, id });
      res.status(201).json({ msg: "User registered Sucessfully" });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error });
    }
  }
}
