import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from 'src/constants';
import { MONGODB_LOCAL_URL, MONGODB_TEST_URL } from './constants';

export const DbModule = MongooseModule.forRoot(
  process.env.NODE_ENV === ENV.dev ? MONGODB_LOCAL_URL : MONGODB_TEST_URL,
);
