import { getAccessToken } from "./core";

export interface IGetDiscountCodeResponse {
  items: IDiscountCodeResponse[];
  limit: number;
  total: number;
  skip: number;
}

export interface IDiscountCodeResponse {
  fields: {
    amount: number;
    code: string;
  };
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const getDiscountCode = async (): Promise<IGetDiscountCodeResponse> => {
  const token = await getAccessToken();
  const response = await fetch(
    `https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount&access_token=${token}`
  );

  return response.json();
};
