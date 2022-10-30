import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find((e) => e.id === id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isActive === false) {
    throw new AppError(400, "User Already excluded");
  }

  await userRepository.update(user!.id, { isActive: false });
};

export default userDeleteService;
