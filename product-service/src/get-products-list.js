import store from "./product-list.json";

// eslint-disable-next-line import/prefer-default-export
export const getProductsList = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },    
    body: 
      JSON.stringify(store.stocks)
  };
};
