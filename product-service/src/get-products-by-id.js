import { getProduct} from './db/product';

// eslint-disable-next-line import/prefer-default-export
export const getProductById = async (event) => {
  console.log('Start getProductById', event);

  try {
    const { productId } = event.pathParameters;
    console.log('Product id', productId);

    const product = await getProduct(productId);
    console.log('Product from database', product);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },    
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.error('Exception', error)

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },    
      body: JSON.stringify({ error: "Product cannot be received" }),
    };
  }
};
