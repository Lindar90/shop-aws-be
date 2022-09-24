import {Handler} from "aws-lambda";
import { formatJSONResponse } from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';

import di from '@/di';

const { productRepo } = di;

export const getProductsList: Handler = async () => {
  const products = await productRepo.getAll();

  return formatJSONResponse({ data: products });
};

export const main = middyfy(getProductsList);
