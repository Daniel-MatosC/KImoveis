import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules_user_properties.entity";
import { ISchedule, IScheduleRequest } from "../../interfaces/schedules";
import { User } from "../../entities/user.entity";
import { v4 as uuid } from "uuid";
import { AppError } from "../../errors/appError";

const scheduleCreateService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest): Promise<Schedules> => {
  if (!userId || !date || !hour || !propertyId) {
    throw new Error("Missing body informations");
  }

  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const userRepository = AppDataSource.getRepository(User);

  const schedules = await scheduleRepository.find();
  const properties = await propertiesRepository.find();
  const users = await userRepository.find();

  const property = properties.find((e) => e.id === propertyId);

  if (!property) {
    throw new AppError(404, "Inavalid Property Id");
  }
  const schedule = schedules.find((e) => e.hour === hour && e.date === date);

  if (schedule) {
    throw new AppError(400, "There is already a visitor at this horary");
  }

  if (Number(hour.slice(0, 2)) < 8 || Number(hour.slice(0, 2)) > 18) {
    throw new AppError(
      400,
      "You can only schedule a visit during business hours"
    );
  }

  const user = users.find((e) => e.id === userId);

  const scheduleCreated = scheduleRepository.create({
    hour,
    user,
    properties: property,
    date,
  });

  await scheduleRepository.save(scheduleCreated);
  console.log(scheduleCreated);
  return scheduleCreated;
};

export default scheduleCreateService;
