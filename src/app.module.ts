import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

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
import { RoomModule } from './room/room.module';
import { RoomNumberModule } from './room-number/room-number.module';
import { AuthMiddleware } from './auth/middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SearchModule } from './search/search.module';
import { AmentitiesModule } from './amentities/amentities.module';
import { OfferingModule } from './offering/offering.module';
import { CommentsModule } from './comments/comments.module';
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
    JwtModule.register({}),
    RoomNumberModule,
    MulterModule.register({
      storage: diskStorage({
        destination: '../images', // Đường dẫn lưu trữ tạm thời
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
    SearchModule,
    AmentitiesModule,
    OfferingModule,
    CommentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },
    RoomService,
    AuthService,

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Áp dụng middleware AuthMiddleware cho route '/api/hotels'
    consumer.apply(AuthMiddleware).forRoutes('api/hotels');
    // Áp dụng middleware AuthMiddleware cho route '/api/categories'
    consumer.apply(AuthMiddleware).forRoutes('api/categories');
  }
}
