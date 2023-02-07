import { Request, Response } from "express";
import Messages from "../models/Messages";

export async function getAllMessages(req: Request, res: Response) {
  try {
    const messages = await Messages.findAll({
      order: [["createdAt", "ASC"]],
    });

    if (messages) {
      res.status(200).json(messages);
    }
  } catch (error: unknown) {
    return res
      .status(501)
      .send("Server couldn`t find messages from the database " + error);
  }
}

export async function createMessage(req: Request, res: Response) {
  try {
    const message = await Messages.create({
      author: req.body.author,
      content: req.body.content,
    });

    if (message) {
      res.status(201).send("Message has been created");
    }
  } catch (error: unknown) {
    return res.status(501).send("Message couldn`t be created " + error);
  }
}

export async function updateMessage(req: Request, res: Response) {
  try {
    const message: any = await Messages.findOne({
      where: { id: req.params.id },
    });

    if (message) {
      message.content = req.body.content;
      await message.save();
      res.status(201).send("Message has been edited");
    }
  } catch (error: unknown) {
    return res.status(501).send("Message couldn`t be edited " + error);
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const message: any = await Messages.findOne({
      where: { id: req.params.id },
    });

    if (message) {
      await Messages.destroy({
        where: { id: req.params.id },
      });
      res.status(201).send("Message has been deleted");
    }
  } catch (error: unknown) {
    return res.status(501).send("Message couldn`t be deleted " + error);
  }
}
