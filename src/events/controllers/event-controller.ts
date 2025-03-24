import { Body, Controller, Post, Req } from '@nestjs/common';
import { EventPresentationService } from '../presentation-services/event-presentation-service';
import { CreateEventDto } from '../dto/input/create-event.dto';

@Controller('events ')
export class EventController {
  constructor(private eventsService: EventPresentationService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto, @Req() req) {
    const userId = req.user.id;
    return this.eventsService.createEvent({ CreateEventDto, ...userId });
  }
}
