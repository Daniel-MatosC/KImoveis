import { Router } from "express";
import schedulesCreateController from "../controllers/schedules/schedulesCreate.controller";
import schedulesListController from "../controllers/schedules/schedulesList.controller";

import { isAdmAuth } from "../middlewares/isAdmAuth.middlewares";
import { authUser } from "../middlewares/authUser.middleware";

const routes = Router();

export const schedulesRoutes = () => {
  routes.post("/", authUser, schedulesCreateController);
  routes.get("/properties/:id", authUser, isAdmAuth, schedulesListController);
  return routes;
};
