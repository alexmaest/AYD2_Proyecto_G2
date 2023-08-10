const s3 = require('@aws-sdk/client-s3');
require('dotenv').config();
const url = require('@aws-sdk/s3-request-presigner');
const fs = require('fs');

const client = new s3.S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

class filesController {//FG
    constructor() { }
    async uploadImage(image) {
        try {
            const res1 = await fetch(image)
            const blob = await res1.arrayBuffer()
            const random = Math.floor(Math.random() * 10000)
            const filename = "file" + random
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filename,
                Body: blob,
                ContentType: "image",
                ContentEncoding: "base64"
            }
            const command = new s3.PutObjectCommand(uploadParams)
            const result = await client.send(command)
            const urlFile = `https://bucketretromusic.s3.us-east-2.amazonaws.com/${filename}`
            return (urlFile)
        } catch (err) {
            return null
        }
    }
}

module.exports = new filesController();