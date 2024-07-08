import { Body, Controller, Post } from '@nestjs/common';
import { RoomNumberService } from './room-number.service';
import { CreateRoomNumberDto } from './dto';

@Controller('api/room-number')
export class RoomNumberController {
    constructor(private readonly roomNumberService : RoomNumberService) {}
    @Post('create')
    async createRoomNumber(@Body() dto: CreateRoomNumberDto){
        return this.roomNumberService.create(dto);
    }
}
