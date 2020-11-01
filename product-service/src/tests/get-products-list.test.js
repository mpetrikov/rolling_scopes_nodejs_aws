import { getProductsList } from "../get-products-list";

test("getProductsList returns correct list", async () => {
  const productListAnswer = await getProductsList();
  expect(productListAnswer.statusCode === 200).toBe(true);
  expect(productListAnswer.body !== "").toBe(true);

  const productList = JSON.parse(productListAnswer.body);
  expect(Array.isArray(productList)).toBe(true);
  expect(productList.length).toBeGreaterThan(0);
});

test("getProductsList products have correct fields", async () => {
  const productListAnswer = await getProductsList();
  expect(productListAnswer.statusCode === 200).toBe(true);
  expect(productListAnswer.body !== "").toBe(true);

  const productList = JSON.parse(productListAnswer.body);
  const oneProduct = productList[0];
  expect(oneProduct.title && oneProduct.title !== "").toBe(true);
  expect(oneProduct.price >= 0).toBe(true);
});
