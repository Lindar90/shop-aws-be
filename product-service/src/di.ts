import {IProductRepoInterface} from "@/types/repositories";
import DynamoDbProductRepo from "@/repositories/DynamoDbProductRepo";
import {ddbDocClient} from "@/dbClient";

export default {
  productRepo: new DynamoDbProductRepo(ddbDocClient),
} as {
  productRepo: IProductRepoInterface,
};
