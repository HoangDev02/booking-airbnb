import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomNumberService } from './room-number.service';
import { CreateRoomNumberDto } from './dto';
import { RoleAuthGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';

@Controller('room-number')
export class RoomNumberController {
  constructor(private readonly roomNumberService: RoomNumberService) {}

  @UseGuards(RoleAuthGuard)
  @Roles(3)
  @Post('create')
  async createRoomNumber(@Body() dto: CreateRoomNumberDto) {
    return this.roomNumberService.create(dto);
  }
  @Get()
  async getRoomNumbers() {
    return this.roomNumberService.getRoomNumbers();
  }
  @Get('find/:id')
  async getRoomNumberById(id: number) {
    return this.roomNumberService.getRoomNumberById(id);
  }

  @Get('room/:id')
  async getRoomNumberByIdRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomNumberService.getRoomNumberByIdRoom(id);
  }
  @Get('find')
  async getRoomNumberByIdRoomAndNumber(
    @Query('roomId', ParseIntPipe) roomId: number,
    @Query('number', ParseIntPipe) number: number,
  ) {
    return this.roomNumberService.getRoomNumberByIdRoomAndNumber(
      roomId,
      number,
    );
  }
}
