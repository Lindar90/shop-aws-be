import StaticProductRepo from "./repositories/StaticProductRepo";
import { IProductRepoInterface } from "./repositories/ProductRepoInterface";

export default {
  productRepo: new StaticProductRepo(),
} as {
  productRepo: IProductRepoInterface,
};
