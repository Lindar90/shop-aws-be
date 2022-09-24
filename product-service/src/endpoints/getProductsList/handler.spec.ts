import context from 'aws-lambda-mock-context';
import { getProductsList } from "@/endpoints/getProductsList/handler";
import di from '@/di';

jest.mock('@/di', () => ({
  productRepo: {
    getAll: jest.fn(),
  },
}));

const ctx = context();

describe('getProductsList', () => {
  afterAll(() => ctx.done())

  test('returns success response', async () => {
    const expectedList = [{ id: 'id1'}, { id: 'id2' }];

    (di.productRepo.getAll as jest.Mock).mockReturnValue(expectedList);

    const result = await getProductsList({}, ctx, () => {});

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify({
        data: expectedList,
      }),
    });
  });
});