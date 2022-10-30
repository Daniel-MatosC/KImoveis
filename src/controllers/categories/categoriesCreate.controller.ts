import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoriesCreateService from "../../services/categories/categoriesCreate.service";

const categoriesCreateController = async (req: Request, res: Response) => {
  try {
    const createdCategory = await categoriesCreateService(req.body);

    return res.status(201).send(createdCategory);
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
};
export default categoriesCreateController;
