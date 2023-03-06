import * as dotenv from 'dotenv';
dotenv.config();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ENV } from './constants';
import { DBService } from './db/db.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors(
    process.env.NODE_ENV === ENV.development
      ? {
          origin: 'http://localhost:3000',
        }
      : undefined,
  );
  const logger = new Logger('bootstrap');

  logger.log(`Starting on env: '${process.env.NODE_ENV}'`);
  await app.init();

  logger.log(`Waiting for database connection...`);
  const dbService: DBService = app.get(DBService);
  while ((await dbService.isConnectionReady()) === false) {
    logger.log('Database connection not ready, waiting...');
    await new Promise((r) => setTimeout(r, 50));
  }
  logger.log(`Database connection ready`);

  const port = process.env.PORT ?? 3001;
  logger.log(`Listening on port: ${port}`);
  await app.listen(port);
}
bootstrap();
