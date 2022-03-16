import { Injectable } from '@nestjs/common';
import { Message } from '@send.partners/common';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
