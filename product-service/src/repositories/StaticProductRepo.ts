import productList from '@/mockData/productList.json';
import {IProductRepoInterface} from "@/types/repositories";
import {IProduct} from "@/types/models";

export default class StaticProductRepo implements IProductRepoInterface {
  getAll() {
    return Promise.resolve(productList)
  }

  getById(id: string) {
    return Promise.resolve(
      (productList as IProduct[]).find((product) => product.id === id) || null
    );
  }
}