import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import scheduleListService from "../../services/schedules/schedulesList.service";

const schedulesListController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const schedules = await scheduleListService(id);

    return res.json({ schedules: schedules });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default schedulesListController;
