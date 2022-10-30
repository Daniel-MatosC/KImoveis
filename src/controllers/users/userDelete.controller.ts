import { Request, Response } from "express";
import userDeleteService from "../../services/users/userDelete.service";
import { AppError, handleError } from "../../errors/appError";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userDeleted = await userDeleteService(id);

    return res.status(204).send("User inactive successfully");
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userDeleteController;
