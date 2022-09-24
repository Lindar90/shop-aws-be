import {Handler} from "aws-lambda";
import {formatJson404Response, formatJSONResponse} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import di from '../../di';

const { productRepo } = di;

const getProductsById: Handler = async (event) => {
  const id = event.pathParameters.productId;
  const product = productRepo.getById(id)

  if (!product) {
    return formatJson404Response('Product not found');
  }

  return formatJSONResponse({ data: product });
};

export const main = middyfy(getProductsById);
