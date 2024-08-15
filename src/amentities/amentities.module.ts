import { Module } from '@nestjs/common';
import { AmentitiesController } from './amentities.controller';
import { AmentitiesService } from './amentities.service';

@Module({
  providers: [AmentitiesService],
  controllers: [AmentitiesController]
})
export class AmentitiesModule {}
