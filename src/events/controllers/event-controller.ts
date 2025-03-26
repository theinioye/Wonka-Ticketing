import { Public } from '@/auth/decorators/public.decorators';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateEventDto } from '../dto/input/create-event.dto';
import { SearchEventDto } from '../dto/input/search-event.dto';
import { EventPresentationService } from '../presentation-services/event-presentation-service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventPresentationService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto, @Req() req) {
    const userId = req.user.id;
    return this.eventsService.createEvent({
      CreateEventDto: createEventDto,
      userId,
    });
  }

  @Public()
  @Get()
  async viewAllEvents() {
    return this.eventsService.viewAllEvents();
  }

  @Public()
  @Post('search')
  async searchEvents(@Body() query: SearchEventDto) {
    return this.eventsService.searchEvents(query);
  }
}
