const AWS = require('aws-sdk');
// import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWSSecretKey
});
const BUCKET_NAME = process.env.REACT_APP_Bucket;
const API_VERSION = '2006-03-01'
const s3 = new AWS.S3({
    apiVersion: API_VERSION,
});

// function uploadFileToS3(file) {
export default function uploadFileToS3(file) {
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file,
        ACL: 'public-read'
    };
    // call S3 to retrieve upload file to specified bucket
    return new Promise((resolve, reject) => {
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                reject('');
            }
            if (data) {
                resolve(data.Location);
            }
        });
    });
}