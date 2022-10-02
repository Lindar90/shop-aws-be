import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import {IProductRepoInterface} from "@/types/repositories";
import {IProduct} from "@/types/models";
import {PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME} from "@/constants";

export default class DynamoDbProductRepo implements IProductRepoInterface {
  #dbClient;

  constructor(client: DynamoDBDocumentClient) {
    this.#dbClient = client;
  }

  async getAll(): Promise<IProduct[]> {
    const { Items: productItems } = await this.#dbClient.send(new ScanCommand({
      TableName: PRODUCTS_TABLE_NAME,
    }));

    const { Items: stockItems } = await this.#dbClient.send(new ScanCommand({
      TableName: STOCKS_TABLE_NAME,
    }));

    return productItems.map((item) => ({
      ...item,
      count: stockItems.find((sItem) => sItem.product_id === item.id)?.count ?? null,
    }));
  }

  async getById(id: string): Promise<IProduct | null> {
    const { Item: itemProduct } = await this.#dbClient.send(new GetCommand({
      TableName: PRODUCTS_TABLE_NAME,
      Key: {
        id,
      },
    }));

    const { Item: itemStock } = await this.#dbClient.send(new GetCommand({
      TableName: STOCKS_TABLE_NAME,
      Key: {
        product_id: id,
      },
    }));

    return {
      ...itemProduct,
      count: itemStock.count,
    };
  }

  async create(item: Omit<IProduct, "id">): Promise<null> {
    const productId = uuidv4();

    const productPromise = this.#dbClient.send(new PutCommand({
      TableName: PRODUCTS_TABLE_NAME,
      Item: {
        id: productId,
        title: item.title,
        description: item.description,
        price: item.price,
      },
    }));



    const stockPromise = this.#dbClient.send(new PutCommand({
      TableName: STOCKS_TABLE_NAME,
      Item: {
        product_id: productId,
        count: item.count,
      },
    }));

    await Promise.all([
      productPromise,
      stockPromise,
    ]);

    return ;
  }
}
