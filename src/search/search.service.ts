import { Injectable } from '@nestjs/common';
import { SearchRoomsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}
  async searchRooms(searchRoomsDto: SearchRoomsDto) {
    const { startDate, endDate, city,adult,children } = searchRoomsDto;

    // Convert dates to JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Fetch all rooms that match the city criteria
    const rooms = await this.prisma.room.findMany({
      where: {
        hotel: {
          city: city ? { contains: city, mode: 'insensitive' } : undefined,
        },
        OR: [
          {
            bookings: {
              some: {
                active: false,
              },
            },
          },
          {
            bookings: {
              none: {}, // This ensures that rooms without bookings are also included
            },
          },
        ],
      },
      include: {
        hotel: true,
        roomNumbers: true,
      },
    });
    
    // Filter rooms based on unavailable dates
    const availableRooms = rooms.filter(room =>
      room.maxPeople >= (parseInt(adult) + parseInt(children)) &&
      room.roomNumbers.some(roomNumber =>
        roomNumber.unavailableDates.every(
          date => {
            return date >= start && date <= end;
          }
        )
      )
    );

    return availableRooms;
  }
}
