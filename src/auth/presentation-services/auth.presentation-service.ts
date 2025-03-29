import { BadRequestException, Injectable } from '@nestjs/common';
import { PlannerPresentationService } from 'src/planner/presentation-services.ts/planner.presentation-service';
import { UserPresentationService } from 'src/user/presentation-services/user.presentation-service';
import { UserSignInDto } from '../dto/user-sign-in.dto';
// import { comparehash } from 'src/common/utils';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Planner } from 'src/planner/entities/planner.entity';
import { User } from 'src/user/entities/user.entity';
import {
  PlannerAuthSignInResponse,
  UserAuthSignInResponse,
} from '../dto/auth-response.dto';
import { PlannerSignInDto } from '../dto/planner-sign-in.dto';

@Injectable()
export class AuthPresentationService {
  constructor(
    private userService: UserPresentationService,
    private plannerService: PlannerPresentationService,

    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async userLogIn(data: UserSignInDto) {
    const { email, password } = data;
    const user = await this.userService.db.findOne({
      where: {
        email,
      },
      select: ['id', 'firstName', 'lastName', 'password', 'email'],
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const passwordMatch = await user.verifyPassword(password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    await this.userService.db.update(user.id, {
      lastLogInDate: new Date(),
    });

    return this.generateToken(user);
  }

  async plannerLogIn(data: PlannerSignInDto) {
    const { email, password } = data;
    const planner = await this.plannerService.db.findOne({
      where: {
        email,
      },
      select: ['id', 'name', 'password', 'email'],
    });
    if (!planner) {
      throw new BadRequestException('Invalid credentials');
    }
    const passwordMatch = await planner.verifyPassword(password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    await this.plannerService.db.update(planner.id, {
      lastLogInDate: new Date(),
    });
    return this.generatePlannerToken(planner);
  }

  async generatePlannerToken(
    planner: Planner,
  ): Promise<PlannerAuthSignInResponse> {
    const payload = {
      sub: planner.id,
      email: planner.name,
    };

    return {
      user: {
        id: planner.id,
        email: planner.email,
        lastLoginDate: planner.lastLogInDate,
        profileImageUrl: planner.profileImageUrl,
        name: planner.name,
      },
      token: await this.#getTokens(payload),
    };
  }

  async generateToken(user: User): Promise<UserAuthSignInResponse> {
    const payload = {
      sub: user.id,
      email: user.firstName,
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        lastLoginDate: user.lastLogInDate,
        profileImageUrl: user.profileImageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token: await this.#getTokens(payload),
    };
  }

  async #getTokens(payload: {
    sub: string;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_AT'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_AT'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
