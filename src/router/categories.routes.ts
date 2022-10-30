import { Router } from "express";

import { isAdmAuth } from "../middlewares/isAdmAuth.middlewares";
import { authUser } from "../middlewares/authUser.middleware";

import categoriesCreateController from "../controllers/categories/categoriesCreate.controller";
import categoriesListController from "../controllers/categories/categoriesList.controller";
import categoriesListPropertiesController from "../controllers/categories/categoriesListProperties.controller";

const routes = Router();

export const categoriesRoutes = () => {
  routes.post("/", authUser, isAdmAuth, categoriesCreateController);
  routes.get("/", categoriesListController);
  routes.get("/:id/properties", categoriesListPropertiesController);

  return routes;
};
