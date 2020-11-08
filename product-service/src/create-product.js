import { createProduct as createProductInDb  } from './db/product';
import Joi from 'joi';

const productSchema = Joi.object().keys({
  title: Joi.string().required().error(new Error('A title should be provided')),
  image: Joi.string().required().error(new Error('A image link should be provided')),
  description: Joi.string(),
  price: Joi.number().min(1).required().error(new Error('A price should be provided')),
  count: Joi.number().min(0).required().error(new Error('A count should be provided')),
});

// eslint-disable-next-line import/prefer-default-export
export const createProduct = async (event) => {
  console.log("Create product start event", event, event.body);

  let productData;
  try {
    productData = JSON.parse(event.body);
    console.log('parsed product data', productData)
    await productSchema.validateAsync(productData);
    console.log('Validation is succeed');
  } catch(error) {
    console.error('Input data error', error)

    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },    
      body: JSON.stringify({ error: "Incorrect product data"}),
    };
  }
  
  try {
    await createProductInDb(productData);
      
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    };
  } catch(error) {
    console.error('Exception', error)

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },    
      body: JSON.stringify({ error: "Product cannot be created" }),
    };
  }

};
