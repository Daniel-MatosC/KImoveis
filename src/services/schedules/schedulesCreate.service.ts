import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules_user_properties.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { User } from "../../entities/user.entity";
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

  const schedulesAll = await scheduleRepository.find();
  const scheduleExist = schedulesAll.find((schedule) => schedule);
  const Property = await propertiesRepository.findOneBy({
    id: propertyId,
  });

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  if (!Property) {
    throw new AppError(404, "Inavalid Property Id");
  }

  if (scheduleExist) {
    throw new AppError(400, "There is already a visitor at this horary");
  }

  if (Number(hour.slice(0, 2)) < 8 || Number(hour.slice(0, 2)) > 18) {
    throw new AppError(
      400,
      "You can only schedule a visit during business hours"
    );
  }

  const scheduleCreated = scheduleRepository.create({
    hour,
    user,
    properties: Property,
    date,
  });

  await scheduleRepository.save(scheduleCreated);

  return scheduleCreated;
};

export default scheduleCreateService;
