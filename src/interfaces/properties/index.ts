import { ICategory } from "../categories";

export interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

export interface IAddress {
  id: string;
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

export interface IPropertyRequest {
  value: number;
  size: number;
  address: IAddressRequest;
  categoryId: string;
}

export interface IProperty {
  id: string;
  sold: boolean;
  value: number;
  size: number;
  createdAt: string;
  updatedAt: string;
  address: IAddress;
  category: ICategory;
}
