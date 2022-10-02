import type { AWS } from '@serverless/typescript';

import getProductsList from '@/endpoints/getProductsList';
import getProductsById from '@/endpoints/getProductsById';
import createProduct from "@/endpoints/createProduct";
import {PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME} from "@/constants";

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-auto-swagger',
    'serverless-esbuild',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    region: "eu-central-1",
    stage: "dev",
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:Get*',
              'dynamodb:Scan*',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: `arn:aws:dynamodb:\${aws:region}:\${aws:accountId}:table/${PRODUCTS_TABLE_NAME}`,
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:Get*',
              'dynamodb:Scan*',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: `arn:aws:dynamodb:\${aws:region}:\${aws:accountId}:table/${STOCKS_TABLE_NAME}`,
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },

    autoswagger: {
      typefiles: ['./src/types/models.ts'],
      useStage: true,
      basePath: ['/dev'],
    },
  },
  resources: {
    Resources: {
      ProductsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          TableName: PRODUCTS_TABLE_NAME,
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },

      StocksTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'product_id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'product_id',
              KeyType: 'HASH',
            },
          ],
          TableName: STOCKS_TABLE_NAME,
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
