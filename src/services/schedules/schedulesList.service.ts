import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const scheduleListService = async (id: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const propertie = await propertiesRepository.findOne({
    where: { id },
    relations: {
      schedules: true,
    },
  });

  if (!propertie) {
    throw new AppError(404, "Incorrect Id");
  }

  if (propertie.schedules.length === 0) {
    throw new AppError(403, "This property does not have opening hours");
  }

  return propertie.schedules;
};
export default scheduleListService;
