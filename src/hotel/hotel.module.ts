import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/auth/middleware';
import { AuthModule } from 'src/auth/auth.module'; // Import AuthModule và AuthService
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({}),
    AuthModule,
  ],
  controllers: [HotelController],
  providers: [
    HotelService, 
    AuthService, 
  ]
})
export class HotelModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Áp dụng middleware AuthMiddleware cho route '/api/hotels'
    consumer.apply(AuthMiddleware).forRoutes('api/hotels');
  }
}
