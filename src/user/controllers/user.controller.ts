import { Controller } from '@nestjs/common';
import { UserPresentationService } from '../presentation-services/user.presentation-service';

@Controller('user')
export class UserController {
  constructor(private userService: UserPresentationService) {}
}
 