import { Express } from "express";
import { deleteUser, getAllUsers, signIn, signUp } from "../controllers/users";

function usersRoutes(app: Express) {
  app.get("/api/users", getAllUsers);
  app.post("/api/signUp", signUp);
  app.post("/api/signIn", signIn);
  app.delete("/api/deleteUser/:id", deleteUser);
}

export default usersRoutes;
