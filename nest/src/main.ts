import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

console.log(`Starting on env: '${process.env.NODE_ENV}'`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  console.log('Listen');
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
