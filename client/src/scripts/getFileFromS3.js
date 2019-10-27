const AWS = require('aws-sdk');
// import AWS from 'aws-sdk';
require('dotenv').config();

AWS.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWSSecretKey
});
const BUCKET_NAME = process.env.REACT_APP_Bucket;
// const BASE_URL = process.env.REACT_APP_BaseUrl;
const API_VERSION = '2006-03-01'
const s3 = new AWS.S3({
    apiVersion: API_VERSION,
});

export default function getFileFromS3() {
    const bucketParams = {
        Bucket: BUCKET_NAME
    };

    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}