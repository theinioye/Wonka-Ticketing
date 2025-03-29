import * as axios from 'axios';
import { ConfigService } from '@nestjs/config';

export type QrcodeResponse = {
  result: string;
};
export class Utils {
  constructor(private readonly configService: ConfigService) {}

  async createQrcode(text: string) {
    const url = `${this.configService.get('QRCODE_URL')}?text=${text})`;
    return { url };
  }
  async verifyQrcode(url: string) {
    const response = await axios.get<QrcodeResponse>(
      `${this.configService.get('QRCODE_URL')}-read?url=${url}`,
    );
    return response.data.result;
  }
}
