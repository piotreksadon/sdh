import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  const config = new DocumentBuilder()
    .setTitle('Zombie API')
    .setDescription('Recruitment task for SDH')
    .setVersion('1.0')
    .addTag('zombie')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  await app.listen(port);
  Logger.log(`App listens on port ${port}`, 'AppInitialization');
}
bootstrap();
