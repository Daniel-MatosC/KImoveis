import { IUserUpdate } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import userUpdateService from "../../services/users/userUpdate.service";
import { User } from "../../entities/user.entity";
import { AppError, handleError } from "../../errors/appError";

const userpdateController = async (req: Request, res: Response) => {
  try {
    const update: IUserUpdate = req.body;
    const id: string = req.params.id;

    const updatedUser = await userUpdateService(update, id);

    if (updatedUser instanceof User) {
      return res.json({ message: updatedUser });
    }

    return res.status(updatedUser[1] as number).json({
      message: updatedUser[0],
    });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userpdateController;
