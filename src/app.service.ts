import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Thank You!! Welcome to NestJS!';
  }
}
