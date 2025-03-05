import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpTokenPresentationService } from 'src/otp-token/presentation-services/otp-token.presentation-service';
import { PlannerPresentationService } from 'src/planner/presentation-services.ts/planner.presentation-service';
import { UserPresentationService } from 'src/user/presentation-services/user.presentation-service';
import { UserSignInDto } from '../dto/user-sign-in.dto';
// import { comparehash } from 'src/common/utils';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { AuthSignInResponse } from '../dto/auth-response.dto';

@Injectable()
export class AuthPresentationService {
  constructor(
    private userService: UserPresentationService,
    private plannerService: PlannerPresentationService,
    private tokenService: OtpTokenPresentationService,
    private jwtService: JwtService,
  ) {}
  async userlogIn(data: UserSignInDto) {
    const { email, password } = data;
    const existingUser = await this.userService.db.findOne({
      where: {
        email,
      },
      select: ['id', 'firstName', 'lastName', 'password', 'email'],
    });
    if (!existingUser) {
      throw new BadRequestException('Invalid credentials');
    }
    const passwordMatch = await existingUser.verifyPassword(password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    await this.userService.db.update(existingUser.id, {
      lastLogInDate: new Date(),
    });

    return this.generateToken(existingUser);
  }
  async generateToken(user: User): Promise<AuthSignInResponse> {
    const payload = {
      sub: user.id,
      email: user.firstName,
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        lastLoginDate: user.lastLogInDate,
        // profileImageUrl: user.profileImageUrl,
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
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_AT,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_AT,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
