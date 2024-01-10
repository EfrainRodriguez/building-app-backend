import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const API_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('BuildingApp API')
    .setDescription('This is the API documentation for BuildingApp')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(API_PREFIX, app, document);

  // CORS
  app.enableCors();

  // Prefix
  app.setGlobalPrefix(API_PREFIX, {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
