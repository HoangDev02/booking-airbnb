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
@Module({
  imports: [
      AuthModule,
      HotelModule,
      PrismaModule,
      ConfigModule.forRoot({ isGlobal: true }),
      CategoriesModule,
      BookingModule,
      UserModule,
    ],
  providers: [
    
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },
  ],
})
export class AppModule {}
