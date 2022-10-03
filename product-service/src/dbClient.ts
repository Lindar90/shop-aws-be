import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { REGION } from "@/constants";

export const ddbClient = new DynamoDBClient({ region: REGION });

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

