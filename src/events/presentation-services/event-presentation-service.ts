import { BaseService } from '@/common/service/base.service';
import { PlannerPresentationService } from '@/planner/presentation-services.ts/planner.presentation-service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from '../entities/events.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/categories.entity';

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

  async createEvent() {}
}
