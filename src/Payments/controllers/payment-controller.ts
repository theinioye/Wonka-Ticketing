import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsPresentationService } from '../presentation-services/payment-presentation-service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paystackService: PaymentsPresentationService) {}

  //   @Post('initialize')
  //   async initializePayment(
  //     @Body() body: { email: string; amount: number; callbackUrl: string },
  //     @Req() req,
  //   ) {
  //     return this.paystackService.initializePayment(
  //       body.email,
  //       body.amount,
  //       req.user.id, // Assuming authentication middleware sets req.user
  //       body.callbackUrl,
  //     );
  //   }

  @Get('verify')
  async verifyPayment(@Query('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }
}
