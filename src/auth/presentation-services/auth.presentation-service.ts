import { Injectable } from '@nestjs/common';
import { PlannerPresentationService } from 'src/planner/presentation-services.ts/planner.presentation-service';
import { UserPresentationService } from 'src/user/presentation-services/user.presentation-service';

@Injectable()
export class AuthPresentationService {
  constructor(
    private userService: UserPresentationService,
    private plannerService: PlannerPresentationService,
    // private tokenService: OTPTokenService,
  ) {}
}
