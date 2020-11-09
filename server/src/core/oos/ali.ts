import OSS from 'ali-oss';
import dotenv from 'dotenv';

dotenv.config();

let bucket = '';
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'production') bucket = 'shuxie';
else bucket = 'shuxie-dev';

let client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI4FqfKWi8iLykHAiRg1Go',
  accessKeySecret: 'INM7qOizdwjIUCRHMTbmXqzzAfk4s3',
  bucket: bucket,
  secure: true,
});

export default client;
