import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Properties } from "../../entities/properties.entity";
import {
  IPropertyRequest,
  IAddress,
  IProperty,
} from "../../interfaces/properties";
import { v4 as uuid } from "uuid";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";

const propertieCreateService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const categoryRepository = AppDataSource.getRepository(Category);
  const addressRepository = AppDataSource.getRepository(Addresses);

  let data: Date = new Date();
  const date: string = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}, ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

  const adresses = await addressRepository.find();

  const categories = await categoryRepository.find();

  const category = categories.find((e) => e.id === categoryId);

  if (!category) {
    throw new AppError(404, "Category not exists");
  }

  const addressAlreadyExists = adresses.find(
    (e) => e.district === address.district
  );

  if (addressAlreadyExists) {
    throw new AppError(400, "This address already registred!");
  }

  const addressCreated: IAddress = addressRepository.create({
    id: uuid(),
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await addressRepository.save(addressCreated);

  const propertiesCreated: IProperty = propertiesRepository.create({
    id: uuid(),
    sold: false,
    value,
    size,
    createdAt: date,
    updatedAt: date,
    address: addressCreated,
    category: category,
  });

  const properties = await propertiesRepository.find();

  const property = properties.find((e) => e.value === value && e.size === size);

  if (property) {
    throw new AppError(400, "This propertie already exists");
  }

  await propertiesRepository.save(propertiesCreated);

  return propertiesCreated;
};

export default propertieCreateService;
