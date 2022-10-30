import { Router } from "express";

import userCreateController from "../controllers/sessions/userCreate.controller";

const sessionRoutes = Router();

export const sessionRouter = () => {
  sessionRoutes.post("/users", userCreateController);

  return sessionRoutes;
};
