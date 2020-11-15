import * as aws from 'aws-sdk';

const BUCKET_NAME = 'upload-files-shop-aws-course';

export const importProductsFile = async (event) => {
  console.log('Start importProductsFile with event: ', event);

  const catalogName = event.queryStringParameters.name;
  const catalogPath = `uploaded/${catalogName}`;

  const s3 = new aws.S3({region: 'eu-west-1'});
  const parameters = {
    Bucket: BUCKET_NAME,
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv'
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', parameters, (error, url) => {
      if (error) {
        return reject(error);
      }

      resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },    
        body: url
      })
    });
  })
};
