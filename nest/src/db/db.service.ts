import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CONNECTION_READY } from './constants';

@Injectable()
export class DBService {
  private readonly logger = new Logger(DBService.name);
  constructor(@InjectConnection() private connection: Connection) {
    this.logger.log(
      'Database connection status: ' +
        (connection.readyState === CONNECTION_READY ? 'READY' : 'NOT READY'),
    );
    this.logger.log('Database host: ' + connection.host);
  }

  async isConnectionReady() {
    return this.connection.readyState === 1;
  }
}
