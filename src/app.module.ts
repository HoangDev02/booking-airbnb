import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { HotelModule } from './hotel/hotel.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    AuthModule,
    HotelModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoriesModule,
  ],
  providers: [CategoriesService],
})
export class AppModule {}
