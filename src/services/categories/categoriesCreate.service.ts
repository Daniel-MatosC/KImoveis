import { v4 as uuid } from "uuid";
import { ICategory, ICategoryRequest } from "../../interfaces/categories";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import AppDataSource from "../../data-source";

const categoriesCreateService = async (
  category: Category
): Promise<ICategoryRequest> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryExists = await categoryRepository.findOneBy({
    name: category.name,
  });

  if (categoryExists) {
    throw new AppError(400, "Category already exists");
  }

  const categoryCreated = categoryRepository.create({ name: category.name });

  await categoryRepository.save(categoryCreated);

  return categoryCreated;
};

export default categoriesCreateService;
