import StaticProductRepo from "@/repositories/StaticProductRepo";
import {IProductRepoInterface} from "@/types/repositories";

export default {
  productRepo: new StaticProductRepo(),
} as {
  productRepo: IProductRepoInterface,
};
