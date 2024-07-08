import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto';
import { JwtGuard, RoleAuthGuard } from 'src/auth/guard';
import { getUser, Roles } from 'src/auth/decorator';

@Controller('api/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('create')
  @UseGuards(JwtGuard, RoleAuthGuard)
  @Roles(1,2)
  async createHotel(
    @Body() dto: CreateHotelDto,
    @getUser('id', ParseIntPipe) userId: number,
  ) {
    return this.hotelService.createHotel(userId, dto);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  async deleteHotel(@Param('id', ParseIntPipe) id: number) {
    return this.hotelService.deleteHotel(id);
  }
  @Get()

  async getHotels() {
    return this.hotelService.getHotels();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getHotelById(@Param('id', ParseIntPipe) id: number) {
    return this.hotelService.getHotelById(id);
  }
}
