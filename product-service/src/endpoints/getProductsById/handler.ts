import {Handler} from "aws-lambda";
import {formatJson404Response, formatJson500Response, formatJSONResponse} from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';

import di from '@/di';

const { productRepo } = di;

export const getProductsById: Handler = async (event) => {
  try {
    const id = event.pathParameters.productId;

    console.log('getProductsById productID: ', id);

    const product = await productRepo.getById(id)

    if (!product) {
      return formatJson404Response('Product not found');
    }

    return formatJSONResponse({ data: product });
  } catch (e) {
    return formatJson500Response();
  }
};

export const main = middyfy(getProductsById);
