import { Request, Response } from "express";
import userCreateService from "../../services/sessions/userCreate.service";
import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../../interfaces/users";
import { AppError, handleError } from "../../errors/appError";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const user: IUserRequest = req.body;
    const createdUser = await userCreateService(user);
    return res.status(201).json(instanceToPlain(createdUser));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userCreateController;
