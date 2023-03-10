import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from 'src/constants';
import { MONGODB_LOCAL_URL, MONGODB_TEST_URL } from './constants';

export const DBModule = MongooseModule.forRoot(
  process.env.NODE_ENV === ENV.development
    ? MONGODB_LOCAL_URL
    : MONGODB_TEST_URL.replace(
        '<password>',
        process.env.MONGODB_TEST_PASS ?? '',
      ),
);
