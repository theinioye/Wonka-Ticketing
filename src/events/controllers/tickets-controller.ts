import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CreateTicketInputDto } from '../dto/input/create-ticket.dto';
import { TicketPresentationService } from '../presentation-services/ticket-presentation service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketPresentationService) {}

  @Post('/initialize')
  async createTicket(@Body() body: CreateTicketInputDto, @Req() req) {
    const user = req.user;
    const data = { user, ...body };
    return this.ticketsService.initializeTicket(data);
  }

  @Get('/verify')
  async verifyTicket(@Query('reference') reference: string) {
    return this.ticketsService.verifyTicket(reference);
  }
}
