import { Message } from '@common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
