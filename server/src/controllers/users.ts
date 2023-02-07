import { Request, Response } from "express";
import Users from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const dotenv = require("dotenv").config();

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await Users.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (users) {
      return res.status(200).json(users);
    }
  } catch (error: unknown) {
    return res
      .status(501)
      .send("Server couldn`t find users from the database " + error);
  }
}

export async function signUp(req: Request, res: Response) {
  try {
    bcrypt.hash(req.body.password, 10).then(async (hashedPassword: string) => {
      const user = await Users.create({
        username: req.body.username,
        password: hashedPassword,
      });

      if (user) {
        return res.status(201).send("User has been created");
      }
    });
  } catch (error: unknown) {
    return res.status(501).send("User couldn`t be created " + error);
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const user: any = await Users.findAll({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.send(404).send("No user with that username could be found");
    } else {
      bcrypt
        .compare(req.body.password, user[0].password)
        .then((passwordValid) => {
          if (!passwordValid) {
            return res.status(401).json({ error: "Invalid logs" });
          } else {
            return res.status(200).json({
              data: user[0].username,
              token: jwt.sign({ data: user[0].id }, `${process.env.JWT_TOKEN}`),
            });
          }
        });
    }
  } catch (error: unknown) {
    res.status(501).send("Couldn't log in " + error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const message: any = await Users.findOne({
      where: { id: req.params.id },
    });

    if (message) {
      await Users.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).send("User has been deleted");
    }
  } catch (error: unknown) {
    return res.status(501).send("User couldn`t be deleted " + error);
  }
}
