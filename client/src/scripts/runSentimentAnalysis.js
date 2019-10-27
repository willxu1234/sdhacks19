const AWS = require('aws-sdk');
// import AWS from 'aws-sdk';
require('dotenv').config();

AWS.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWSSecretKey
});
const API_VERSION = '2017-11-27'
const comprehend = new AWS.Comprehend({
    apiVersion: API_VERSION,
});

export default function runSentimentAnalysis(text) {
    const sentimentParams = {
        Text: text,
        LanguageCode: "en"
    };

    return new Promise((resolve, reject) => {
        comprehend.detectSentiment(sentimentParams, (err, data) => {
            if (err) {
                reject('');
            }
            if (data) {
                console.log(data)
                resolve(data);
            }
        })
    })
}