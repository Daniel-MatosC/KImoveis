import { IProperty } from "../properties";
import { IUser } from "../users";

export interface IScheduleRequest {
  userId: string;
  propertyId: string;
  date: string;
  hour: string;
}

export interface ISchedule {
  id: string;
  hour: string;
  user: IUser;
  properties: IProperty;
  date: string;
}
