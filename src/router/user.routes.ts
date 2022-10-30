import { Router } from "express";

import { isAdmAuth } from "../middlewares/isAdmAuth.middlewares";
import { authUser } from "../middlewares/authUser.middleware";

import userListController from "../controllers/users/userList.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/login", userLoginController);

  routes.get("/users", authUser, isAdmAuth, userListController);

  routes.patch("/users/:id", authUser, userUpdateController);

  routes.delete("/users/:id", authUser, isAdmAuth, userDeleteController);

  return routes;
};
