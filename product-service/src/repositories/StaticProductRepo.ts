import productList from '../mockData/productList.json';
import {IProduct, IProductRepoInterface} from "./ProductRepoInterface";

export default class StaticProductRepo implements IProductRepoInterface {
  getAll() {
    return productList;
  }

  getById(id: string): IProduct {
    return (productList as IProduct[]).find((product) => product.id === id);
  }
}