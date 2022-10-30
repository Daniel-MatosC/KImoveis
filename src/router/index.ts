import { Express } from "express";
import { categoriesRoutes } from "./categories.routes";
import { propertiesRoutes } from "./properties.routes";
import { schedulesRoutes } from "./schedules.routes";
import { userRoutes } from "./user.routes";
import { sessionRouter } from "./sessions.routes";

export const appRoutes = (app: Express) => {
  app.use("", userRoutes());
  app.use("", sessionRouter());
  app.use("/categories", categoriesRoutes());
  app.use("/properties", propertiesRoutes());
  app.use("/schedules", schedulesRoutes());
};
