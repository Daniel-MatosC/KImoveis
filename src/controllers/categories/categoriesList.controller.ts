import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoriesListService from "../../services/categories/categoriesList.service";

const categoriesListController = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesListService();

    return res.send(categories);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
export default categoriesListController;
