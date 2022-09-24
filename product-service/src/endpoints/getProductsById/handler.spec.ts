import context from 'aws-lambda-mock-context';
import { getProductsById } from "@/endpoints/getProductsById/handler";
import di from '@/di';

jest.mock('@/di', () => ({
  productRepo: {
    getById: jest.fn(),
  },
}));

const ctx = context();

describe('getProductsById', () => {
  test('returns success response', async () => {
    (di.productRepo.getById as jest.Mock).mockReturnValue({ id: 'id'});
    const event = {
      pathParameters: {
        productId: 'productId',
      },
    };
    const result = await getProductsById(event, ctx, () => {});

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify({
        data: { id: 'id'}
      }),
    });
  });

  test('returns 404 response', async () => {
    (di.productRepo.getById as jest.Mock).mockReturnValue(null);

    const event = {
      pathParameters: {
        productId: 'productId',
      },
    };
    const result = await getProductsById(event, ctx, () => {});

    expect(result).toStrictEqual({
      statusCode: 404,
      body: JSON.stringify({
        message: 'Product not found'
      }),
    });
  });
});