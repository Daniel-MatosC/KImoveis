import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import propertieCreateService from "../../services/properties/propertieCreate.service";

const propertieCreateController = async (req: Request, res: Response) => {
  try {
    const { value, size, address, categoryId } = req.body;

    const properties = await propertieCreateService({
      value,
      size,
      address,
      categoryId,
    });

    return res.status(201).json(properties);
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
};

export default propertieCreateController;
