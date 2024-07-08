import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomNumberDto } from './dto';

@Injectable()
export class RoomNumberService {
    constructor(private readonly prisma:PrismaService) {}
    async create(createRoomNumberDto: CreateRoomNumberDto) {
      const { roomId, bookingRoomId, number, startDate, endDate } = createRoomNumberDto;
  
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      return this.prisma.roomNumber.create({
        data: {
          roomId,
          bookingRoomId,
          number,
          unavailableDates: [formattedStartDate, formattedEndDate],
        },
      });
    }
}
