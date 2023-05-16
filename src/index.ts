import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port || 3000);
})()
