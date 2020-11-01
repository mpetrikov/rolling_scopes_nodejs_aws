import { getProductsById } from "../get-products-by-id";

test("getProductsById returns correct product with id === 1", async () => {
  const productAnswer = await getProductsById({
    pathParameters: { productId: "1" },
  });
  expect(productAnswer.statusCode === 200).toBe(true);
  expect(productAnswer.body !== "").toBe(true);

  const product = JSON.parse(productAnswer.body);
  expect(product.title && product.title !== "").toBe(true);
  expect(typeof product.price === "number").toBe(true);
  expect(product.price >= 0).toBe(true);
});

test("getProductsById returns error with incorrect id", async () => {
  const productAnswer = await getProductsById({
    pathParameters: { productId: "1000" },
  });
  expect(productAnswer.statusCode === 400).toBe(true);
  expect(productAnswer.body !== "").toBe(true);
});
