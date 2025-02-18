import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashstring } from 'src/common/utils';
import { Repository } from 'typeorm';
import { CreatePlannerDto } from '../dtos/request/create-planner.dto';
import { Planner } from '../entities/planner.entity';

@Injectable()
export class PlannerPresentationService {
  constructor(
    @InjectRepository(Planner)
    private repo: Repository<Planner>,
  ) {}
  public db = this.repo;

  async signUp(CreatePlannerDto: CreatePlannerDto): Promise<Planner> {
    const { email, name, password } = CreatePlannerDto;
    const existingUser = await this.repo.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('email already exists');
    }
    const hashedPassword = await hashstring(password);
    const planner = this.repo.create({ email, name, password: hashedPassword });
    return this.repo.save(planner);
  }
}
