import { Express } from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/messages";

// Defines routes & endpoints for the API
function messagesRoutes(app: Express) {
  app.get("/api/messages", getAllMessages);
  app.post("/api/postMessage", createMessage);
  app.patch("/api/editMessage/:id", updateMessage);
  app.delete("/api/deleteMessage/:id", deleteMessage);
}

export default messagesRoutes;
