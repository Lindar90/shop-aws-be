import {Handler} from "aws-lambda";
import {formatJson400Response, formatJson500Response, formatJSONResponse} from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';

import di from '@/di';

const { productRepo } = di;

const isValidRequest = (item) => {
  if (typeof item.title !== 'string') return false;
  if (typeof item.price !== 'number') return false;
  if (typeof item.description !== 'string') return false;

  return typeof item.count === 'number';
};

export const createProduct: Handler = async (event) => {
  try {
    const body = event.body;

    console.log('Request body: ', body);

    if (!isValidRequest(body)) {
      return formatJson400Response();
    }

    await productRepo.create(body)

    return formatJSONResponse({ data: { status: 'Created' } });
  } catch (e) {
    return formatJson500Response();
  }
};

export const main = middyfy(createProduct);
