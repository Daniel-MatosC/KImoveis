import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
import { IIdCategory } from "../../interfaces/categories";

const categoriesListPropertiesService = async ({ id }: IIdCategory) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categories = await categoryRepository.find();

  const category = categories.find((e) => e.id === id);

  if (!category) {
    throw new AppError(404, "Invalid Id");
  }
  return category.properties;
};

export default categoriesListPropertiesService;
