import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto';

@Controller('api/hotels')
export class HotelController {
    constructor(private hotelService: HotelService) {}

    @Post('create')
    async createHotel(@Body() dto: CreateHotelDto) {
        return this.hotelService.createHotel(dto);
    }
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('delete/:id')
    async deleteHotel(@Param('id', ParseIntPipe) id: number){
        return this.hotelService.deleteHotel(id);
    }

    @Get()
    async getHotels() {
        return this.hotelService.getHotels();
    }
    @Get(':id')
    async getHotelById(@Param ('id', ParseIntPipe) id: number){
        return this.hotelService.getHotelById(id);
    }

}
