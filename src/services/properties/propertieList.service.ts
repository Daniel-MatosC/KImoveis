import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const propertieListService = async () => {
  const propertieRepository = AppDataSource.getRepository(Properties);

  const properties = await propertieRepository.find();

  return properties;
};
export default propertieListService;
