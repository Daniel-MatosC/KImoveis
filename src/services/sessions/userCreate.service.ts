import { IUserRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const userCreateService = async (user: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((data) => data.email === user.email);

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  const hashedPassword = await hash(user.password, 10);
  const userCreated = userRepository.create({
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    password: hashedPassword,
  });

  await userRepository.save(userCreated);

  return userCreated;
};

export default userCreateService;
