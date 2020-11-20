import aws from 'aws-sdk';
import csv from 'csv-parser';

const BUCKET_NAME = 'upload-files-shop-aws-course';

export const importFileParser = async (event) => {
  console.log('Start importFileParser with event: ', event);
  const s3 = new aws.S3({region: 'eu-west-1'});

  for (const record of event.Records) {
    try {
      console.log('record', record);
      const s3Stream = s3.getObject({
        Bucket: BUCKET_NAME,
        Key: record.s3.object.key
      }).createReadStream();

      const sourceKey = record.s3.object.key;
      const sourceBucketPath = `${BUCKET_NAME}/${sourceKey}`;
      const destinationKey = record.s3.object.key.replace('uploaded', 'parsed');
      console.log(`Copying from ${sourceBucketPath} into ${BUCKET_NAME}/${destinationKey}`);

      await (new Promise((resolve, reject) => {
        s3Stream.pipe(csv()).on('data', (data) => {
          console.log('data', data);
        })
        .on('end', async () => {
          console.log('end');
          await s3.copyObject({
            Bucket: BUCKET_NAME,
            CopySource: sourceBucketPath,
            Key: destinationKey
          }).promise();

          await s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: sourceKey
          }).promise();

          console.log(`File has parsed and moved`);
          resolve();
        })
        .on('error', (error) => {
          console.log('error');
          reject(error);
        })
      }));
    } catch(error) {
      console.log("exception", error)
    }
  } 
};
