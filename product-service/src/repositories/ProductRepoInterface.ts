export interface IProduct {
  count: number,
  description: string,
  id: string,
  price: number,
  title: string,
}

export interface IProductRepoInterface {
  getAll(): IProduct[],
  getById(id: string): IProduct,
}
