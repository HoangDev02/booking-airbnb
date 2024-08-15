import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto';

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}
    @Post('create')
    async createRoom(@Body() dto: CreateRoomDto){
        return this.roomService.createRoom(dto);
    }
    
    @Get('hotel/:id')
    async getRoomByIdHotel(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.getRoomByIdHotel(id);
    }
}
