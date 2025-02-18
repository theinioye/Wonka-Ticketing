import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserPresentationService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  public db = this.repo;
}
