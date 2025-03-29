import { PaystackResponseDto } from '../../../payments/dtos/response/paystack-response.dto';

export class InitializeTicketResponseDto implements PaystackResponseDto {
  status: boolean;
  data: { authorization_url: string; access_code: string; reference: string };
  message: string;
}
