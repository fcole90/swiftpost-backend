import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DBModule } from './db/db.module';
import { DBService } from './db/db.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DBModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, DBService],
})
export class AppModule {}
