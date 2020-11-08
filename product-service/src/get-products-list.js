import { getProductList } from './db/products'

// eslint-disable-next-line import/prefer-default-export
export const getProductsList = async () => {
  console.log('Start getProductsList');
  
  try {
    const stocksList = await getProductList();
    console.log('Stocks list from database', stocksList)
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },    
      body: JSON.stringify(stocksList)
    };
  } catch (error) {
    console.error('Exception', error)

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },    
      body: JSON.stringify({ error: "Product list cannot be received" }),
    };
  }
};
