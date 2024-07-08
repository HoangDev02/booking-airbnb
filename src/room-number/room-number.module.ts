import { Module } from '@nestjs/common';
import { RoomNumberService } from './room-number.service';
import { RoomNumberController } from './room-number.controller';

@Module({
  providers: [RoomNumberService],
  controllers: [RoomNumberController]
})
export class RoomNumberModule {}
