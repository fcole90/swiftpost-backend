import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DBService } from './db/db.service';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  logger.log(`Starting on env: '${process.env.NODE_ENV}'`);
  const app = await NestFactory.create(AppModule);
  await app.init();
  const dbService: DBService = app.get(DBService);
  logger.log(`Waiting for database connection...`);
  while ((await dbService.isConnectionReady()) === false) {
    logger.log('Database connection not ready, waiting...');
    await new Promise((r) => setTimeout(r, 2000));
  }
  logger.log(`Database connection ready`);

  const port = process.env.PORT ?? 3001;
  logger.log(`Listening on port: ${port}`);
  await app.listen(port);
}
bootstrap();
