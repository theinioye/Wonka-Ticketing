import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planner } from '../entities/planner.entity';

@Injectable()
export class PlannerPresentationService {
  constructor(
    @InjectRepository(Planner)
    private repo: Repository<Planner>,
  ) {}
  public db = this.repo;
}
