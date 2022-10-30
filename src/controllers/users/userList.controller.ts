import { Request, Response } from "express";
import userListService from "../../services/users/userList.service";
import { instanceToPlain } from "class-transformer";
import { AppError, handleError } from "../../errors/appError";

const userListController = async (req: Request, res: Response) => {
  try {
    const users = await userListService();

    return res.status(200).json(instanceToPlain(users));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userListController;
