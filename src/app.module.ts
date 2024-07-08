import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { HotelModule } from './hotel/hotel.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { BookingModule } from './booking/booking.module';
import { RoleAuthGuard } from './auth/guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { RoomService } from './room/room.service';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { RoomNumberModule } from './room-number/room-number.module';
@Module({
  imports: [
      AuthModule,
      HotelModule,
      PrismaModule,
      ConfigModule.forRoot({ isGlobal: true }),
      CategoriesModule,
      BookingModule,
      UserModule,
      RoomModule,
      RoomNumberModule,
    ],
  providers: [
    
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },
    
    RoomService,
  ],
  controllers: [RoomController],
})
export class AppModule {}
