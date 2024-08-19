import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto';
import { RoleAuthGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}
    
    @UseGuards(RoleAuthGuard)
    @Roles(3)
    @Post('create')
    async createRoom(@Body() dto: CreateRoomDto){
        return this.roomService.createRoom(dto);
    }
    
    @Get('hotel/:id')
    async getRoomByIdHotel(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.getRoomByIdHotel(id);
    }
}
