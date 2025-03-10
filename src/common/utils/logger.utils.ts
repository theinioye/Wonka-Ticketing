import { Logger } from '@nestjs/common';

export class Log extends Logger {
  logEx(message: unknown, context = 'DefaultContext'): void {
    if (typeof message === 'object') {
      this.log(JSON.stringify(message, null, 2), context);
      return;
    }
    this.log(message, context);
  }
}

export default new Log();
