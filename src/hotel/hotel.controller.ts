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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto';
import { JwtGuard, RoleAuthGuard } from 'src/auth/guard';
import { getUser, Roles } from 'src/auth/decorator';
import { Express } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  @Get('write')
  async writeDataToFirebase() {
    return this.hotelService.testFirebase();
  }
  @Post('create')
  @UseInterceptors(FilesInterceptor('photos', 15))
  @UseGuards(JwtGuard, RoleAuthGuard)
  @Roles(2,3)
  async createHotel(
    @Body() dto: CreateHotelDto,
    @getUser('id', ParseIntPipe) userId: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const buffers = images.map(file => file.buffer);
    
    return this.hotelService.createHotel(userId, dto,buffers);
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

  @Get(':id')
  async getHotelById(@Param('id', ParseIntPipe) id: number) {
    return this.hotelService.getHotelById(id);
  }
  @Get('find/:slug')
  async getHotelBySlug(@Param('slug') slug: string) {
    return this.hotelService.getHotelBySlug(slug);
  
  }
  @Get('find/category/:id')
  async getHotelsByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.hotelService.getHotelByCategoryid(id);
  }
}
