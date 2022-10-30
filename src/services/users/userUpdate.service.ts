import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import { IUserUpdate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const userUpdateService = async (
  update: IUserUpdate,
  id: string
): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id });

  const keys = Object.keys(update);

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (
    keys.includes("isAdm") ||
    keys.includes("isActive") ||
    keys.includes("id")
  ) {
    return ["Cannot update this user", 401];
  }

  await userRepository.update(id, {
    name: update.name ? update.name : findUser.name,
    email: update.email ? update.email : findUser.email,
    password: update.password
      ? await hash(update.password, 10)
      : findUser.password,
  });

  const userUpted = await userRepository.findOneBy({ id });

  return userUpted!;
};

export default userUpdateService;
