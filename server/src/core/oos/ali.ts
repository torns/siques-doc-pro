import OSS from 'ali-oss';

let client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI4FqfKWi8iLykHAiRg1Go',
  accessKeySecret: 'INM7qOizdwjIUCRHMTbmXqzzAfk4s3',
  bucket: 'shuxie',
  secure: true,
});

export default client;
