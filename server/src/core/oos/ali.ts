import OSS from 'ali-oss';

let bucket = '';
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
