import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { FirebaseService } from 'src/firebase/firebseConnect';

@Module({
  controllers: [HotelController],
  providers: [HotelService,FirebaseService],
})
export class HotelModule {}
