import aws from 'aws-sdk';
import { productSchema } from './validate/product-schema';
import { createProduct as createProductInDb  } from './db/product';

// eslint-disable-next-line import/prefer-default-export
export const catalogBatchProcess = async (event) => {
  console.log("catalogBatchProcess", event);

  const sns = new aws.SNS();

  try {
    const products = event.Records.map(item => JSON.parse(item.body));
    for (const productData of products) {
      await productSchema.validateAsync(productData);
      await createProductInDb(productData);

      await sns.publish({
        Subject: "Product created",
        Message: JSON.stringify(productData),
        TopicArn: process.env.SNS_ARN
      }).promise();
    }
  } catch(error) {
    await sns.publish({
      Subject: "Product creating error",
      Message: `Error: ${error.message}`,
      TopicArn: process.env.SNS_ARN,
      MessageAttributes: {
        status: {
          DataType: 'String',
          StringValue: 'Error'
        }
      }
    }).promise();
  }
};
