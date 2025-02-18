import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/request/create-user.dto';
import { hashstring } from 'src/common/utils';

@Injectable()
export class UserPresentationService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  public db = this.repo;

  async signUp(data: CreateUserDto): Promise<User> {
    const { email, password, ...rest } = data;
    const existingUser = await this.repo.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User email already exists');
    }
    const hashedPassword = await hashstring(password);
    const newUser = this.repo.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    return this.repo.save(newUser);
  }
}
