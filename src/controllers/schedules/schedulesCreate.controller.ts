import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import scheduleCreateService from "../../services/schedules/schedulesCreate.service";

const schedulesCreateController = async (req: Request, res: Response) => {
  try {
    const { propertyId, date, hour } = req.body;
    const userId = req.user.userId!;

    const schedule = await scheduleCreateService({
      userId,
      propertyId,
      date,
      hour,
    });
    return res
      .status(201)
      .json({ message: "Schedule created", schedule: schedule });
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
};
export default schedulesCreateController;
