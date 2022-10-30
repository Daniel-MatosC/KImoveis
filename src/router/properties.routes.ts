import { Router } from "express";
import propertieCreateController from "../controllers/properties/propertieCreate.controller";
import propertieListController from "../controllers/properties/propertieList.controller";

import { isAdmAuth } from "../middlewares/isAdmAuth.middlewares";
import { authUser } from "../middlewares/authUser.middleware";

const routes = Router();

export const propertiesRoutes = () => {
  routes.post("/", authUser, isAdmAuth, propertieCreateController);
  routes.get("/", propertieListController);
  return routes;
};
