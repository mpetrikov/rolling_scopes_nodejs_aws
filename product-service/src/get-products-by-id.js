import productList from "./product-list.json";

// eslint-disable-next-line import/prefer-default-export
export const getProductsById = async (event) => {
  try {
    const { productId } = event.pathParameters;

    const product = productList.stocks.find(
      (stock) => stock.id === parseInt(productId)
    );
    if (!product) {
      throw "Product not found";
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product not found" }),
    };
  }
};
