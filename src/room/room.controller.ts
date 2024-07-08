import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto';

@Controller('api/room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}
    @Post('create')
    async createRoom(@Body() dto: CreateRoomDto){
        return this.roomService.createRoom(dto);
    }
}
