import awsMock from 'aws-sdk-mock';

import { importProductsFile } from "../import-products-file.js";

test("importProductsFile returns correct url", async () => {
  const signedUrl = 'https://signeed_url.com';
  awsMock.mock("S3", "getSignedUrl", (_operation, _params, cb) => {
    cb(null, signedUrl);
  });

  const importProductAnswer = await importProductsFile({queryStringParameters: {name: 'file.csv'}});
  expect(importProductAnswer.body).toBe(signedUrl);
});
