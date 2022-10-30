import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
import { IIdCategory } from "../../interfaces/categories";

const categoriesListPropertiesService = async ({ id }: IIdCategory) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = await categoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        properties: true,
      },
    });

    if (!categories) {
      throw new AppError(404, "Category not found");
    }
    return categories;
  } catch (err) {
    throw new AppError(404, "Invalid Id");
  }
};

export default categoriesListPropertiesService;
