// import * as axios from 'axios';
import { ConfigService } from '@nestjs/config';
export class Utils {
  constructor(private readonly configService: ConfigService) {}

  async createQrcode(text: string) {
    const url = `${this.configService.get('QRCODE_URL')}?text=${text})`;
    return { url };
  }
}
