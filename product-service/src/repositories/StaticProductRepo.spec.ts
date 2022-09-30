import StaticProductRepo from "@/repositories/StaticProductRepo";

jest.mock('@/mockData/productList.json', () => [
  {
    id: '1111',
    count: 10,
    description: 'Product 1 description',
    price: 100,
    title: 'Product 1 title',
  },
  {
    id: '2222',
    count: 20,
    description: 'Product 2 description',
    price: 200,
    title: 'Product 2 title',
  },
])

describe('StaticProductRepo', () => {
  const repo = new StaticProductRepo();

  test('getAll', async () => {
    expect(await repo.getAll()).toHaveLength(2);
  });

  test('getById', async () => {
    expect((await repo.getById('2222')).title).toBe('Product 2 title');

    expect((await repo.getById('333'))).toBeNull();
  });
})
