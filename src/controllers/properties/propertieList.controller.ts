import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import propertieListService from "../../services/properties/propertieList.service";

const propertieListController = async (req: Request, res: Response) => {
  try {
    const properties = await propertieListService();

    return res.send(properties);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default propertieListController;
