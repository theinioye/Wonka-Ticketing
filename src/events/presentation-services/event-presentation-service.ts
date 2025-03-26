import { BaseService } from '@/common/service/base.service';
import { PlannerPresentationService } from '@/planner/presentation-services.ts/planner.presentation-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from '../entities/events.entity';
import { ILike, In, Repository } from 'typeorm';
import { Category } from '../entities/categories.entity';
import { CreateEventDto } from '../dto/input/create-event.dto';
import { EventResponseDto } from '../dto/response/event-response.dto';
import { SearchEventDto } from '../dto/input/search-event.dto';

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

  async searchEvents(query: SearchEventDto) {
    const { searchTerm } = query;
    const events = await this.eventRepo.find({
      where: [
        { name: ILike(`%${searchTerm}`) },
        { description: ILike(`%${searchTerm}`) },
        {
          planners: {
            name: ILike(`%${searchTerm}`),
          },
        },
      ],
      relations: [`planners`],
    });
    return events as EventResponseDto[];
  }
}
