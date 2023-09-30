import { getAccessToken } from "./core";

export interface IGetCarListResponse {
  items: ICarResponse[];
  limit: number;
  total: number;
  skip: number;
}

export interface ICarResponse {
  fields: {
    photo?: string;
    price: number;
    title: string;
  };
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const getCarList = async (): Promise<IGetCarListResponse> => {
  const token = await getAccessToken();
  const response = await fetch(
    `https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car&access_token=${token}`
  );

  return response.json();
};
