import bcrypt from "bcrypt";
import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import "dotenv/config";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find({
    select: {
      email: true,
      isAdm: true,
      id: true,
      password: true,
      isActive: true,
    },
  });

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new AppError(403, "User not found");
  }

  if (!account.isActive) {
    throw new AppError(403, "User Deleted");
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new AppError(403, "wrong email/password");
  }

  const token = jwt.sign(
    {
      email: email,
      isAdm: account.isAdm,
      userId: account.id,
      isActive: account.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: account.id,
    }
  );
  return token;
};

export default userLoginService;
