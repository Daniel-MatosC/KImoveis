import { v4 as uuid } from "uuid";
import { ICategory, ICategoryRequest } from "../../interfaces/categories";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import AppDataSource from "../../data-source";

const categoriesCreateService = async ({ name }: ICategoryRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categories = await categoryRepository.find();

  const category = categories.find((e) => e.name === name);

  if (!name) {
    throw new AppError(400, "Name required");
  }

  if (category) {
    throw new AppError(400, "Category already exists");
  }

  const categoryCreated: ICategory = categoryRepository.create({
    id: uuid(),
    name,
  });

  categoryRepository.save(categoryCreated);

  return categoryCreated;
};

export default categoriesCreateService;
