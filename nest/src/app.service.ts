import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {
    console.log(
      'Mongoose is ',
      connection.readyState === 1 ? 'ready' : 'not ready',
    );
  }

  async waitConnectionReady() {
    while (!this.connection.readyState) {
      console.log('Waiting for DB connection');
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
