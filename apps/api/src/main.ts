/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));

  app.use((request, response, next) => {
    response.cookie('XSRF-TOKEN', request.csrfToken());

    next();
  });

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
