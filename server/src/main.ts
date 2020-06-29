import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
var bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  app.use(bodyParser.json({ limit: '2100000kb' }));
  app.useStaticAssets(join(__dirname, '../uploads/', 'avator'), {
    prefix: '/static/', // 虚拟名称 http://localhost:3000/static/...png
  });
  const options = new DocumentBuilder()
    .setTitle('后台API管理系统')
    .setDescription('')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3001);
  console.log('http://localhost:3001/api-docs');
}
bootstrap();
