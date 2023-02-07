import { Express } from "express";
import { getAllUsers, signIn, signUp } from "../controllers/users";

// Defines routes & endpoints for the API
function usersRoutes(app: Express) {
  app.get("/api/users", getAllUsers);
  app.post("/api/signUp", signUp);
  app.post("/api/signIn", signIn);
}

export default usersRoutes;
