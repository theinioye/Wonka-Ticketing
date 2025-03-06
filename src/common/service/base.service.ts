import { Log } from '@/common/utils/logger.utils';

export abstract class BaseService {
  protected readonly logger = new Log(BaseService.name);

  constructor() {
    this.logger.log('BaseService initialized');
  }
}
