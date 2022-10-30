import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoriesListPropertiesService from "../../services/categories/categoriesListProperties.service";

const categoriesListPropertiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const categories = await categoriesListPropertiesService({ id });

    return res.send(categories);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default categoriesListPropertiesController;
