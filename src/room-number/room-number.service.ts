import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomNumberDto } from './dto';

@Injectable()
export class RoomNumberService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoomNumberDto: CreateRoomNumberDto) {
    const { roomId, bookingRoomId, number, startDate, endDate } =
      createRoomNumberDto;

    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    return this.prisma.roomNumber.create({
      data: {
        roomId,
        //   bookingRoomId,
        number,
        unavailableDates: [formattedStartDate, formattedEndDate],
      },
    });
  }
  async getRoomNumbers() {
    return this.prisma.roomNumber.findMany();
  }
  async getRoomNumberById(id: number) {
    return this.prisma.roomNumber.findUnique({
      where: {
        id: id,
      },
    });
  }
  async getRoomNumberByIdRoom(id: number) {
    return this.prisma.roomNumber.findMany({
      where: {
        roomId: id,
      },
      include: {
        room: true
      }
    });
  }
  async getRoomNumberByIdRoomAndNumber(roomId: number, number: number) {
    try {
      const roomNumber = await this.prisma.roomNumber.findUniqueOrThrow({
        where: {
          roomId_number: {
            roomId: roomId ,
            number: number
          }
        },
       
      });
      
      if (!roomNumber) {
        throw new Error('Room number not found');
      }

      return roomNumber;
    } catch (error) {
      throw new Error(`Failed to get room number: ${error.message}`);
    }
  }
}
