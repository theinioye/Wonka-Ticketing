import { Body, Controller, Post, Req } from '@nestjs/common';
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
}
