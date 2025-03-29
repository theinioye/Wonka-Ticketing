import { BaseService } from '@/common/service/base.service';
import { PlannerPresentationService } from '@/planner/presentation-services.ts/planner.presentation-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateEventDto } from '../dto/input/create-event.dto';
import { SearchEventDto } from '../dto/input/search-event.dto';
import { EventResponseDto } from '../dto/response/event-response.dto';
import { Category } from '../entities/categories.entity';
import { Events } from '../entities/events.entity';

type createEvent = { CreateEventDto: CreateEventDto; userId: string };
@Injectable()
export class EventPresentationService extends BaseService {
  constructor(
    private readonly plannerService: PlannerPresentationService,
    @InjectRepository(Events)
    private eventRepo: Repository<Events>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {
    super();
  }
  public db = this.eventRepo;
  async createEvent(data: createEvent) {
    const { userId, CreateEventDto } = data;
    const { categories, coPlanners, ...rest } = CreateEventDto;
    const planner = await this.plannerService.db.findOneBy({
      id: userId,
    });
    if (!planner) {
      throw new NotFoundException('Planner not found');
    }

    const event = await this.eventRepo.create({
      ...rest,

      planners: [planner],
    });

    const categoriesData = categories.map((data) => {
      const category = new Category();
      category.name = data.name;
      category.description = data.description;
      category.price = data.price;
      return category;
    });

    const eventCategories = await this.categoryRepo.save(categoriesData);

    event.categories = eventCategories;

    await this.eventRepo.save(event);

    if (coPlanners) {
      const otherPlanners = await this.plannerService.db.find({
        where: {
          id: In(coPlanners),
        },
      });
      if (otherPlanners.length === 0) {
        throw new NotFoundException('Co-planners not found');
      }

      event.planners = [...event.planners, ...otherPlanners];
      await this.eventRepo.save(event);
    }
    return event;
  }

  async viewAllEvents() {
    const events = await this.eventRepo.find();
    return events as EventResponseDto[];
  }

  async searchEvents(query: SearchEventDto): Promise<EventResponseDto[]> {
    const { searchTerm } = query;

    const events = await this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.planners', 'planner')
      .where('LOWER(event.name) LIKE LOWER(:query)', {
        query: `%${searchTerm}%`,
      })
      .orWhere('LOWER(event.description) LIKE LOWER(:query)', {
        query: `%${searchTerm}%`,
      })
      .orWhere('LOWER(planner.name) LIKE LOWER(:query)', {
        query: `%${searchTerm}%`,
      })
      .getMany();
    console.log(events[0]);

    return events.map((event) => ({
      id: event.id,
      name: event.name,
      description: event.description,
      googleMapUrl: event.googleMapUrl,
      startDate: event.startDate,
      planners:
        event.planners?.map((planner) => ({
          id: planner.id,
          name: planner.name,
        })) || [],
    }));
  }
}
