import {Handler} from "aws-lambda";
import {formatJson500Response, formatJSONResponse} from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';

import di from '@/di';

const { productRepo } = di;

export const getProductsList: Handler = async () => {
  try {
    console.log('getProductsList');

    const products = await productRepo.getAll();

    return formatJSONResponse({ data: products });
  } catch (e) {
    return formatJson500Response();
  }
};

export const main = middyfy(getProductsList);
