import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { updateBookingActiveDto } from './dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const { userId, name, phone, active, rooms, roomId } = createBookingDto;

    try {
      const user = this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        });
      if (!user) {
        throw new Error('User not found');
      }
      const room = this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });
      if (!room) {
        throw new Error('Room not found');
      }
      // Create booking using Prisma's create method
      const booking = await this.prisma.booking.create({
        data: {
          user: { connect: { id: userId } },
          name,
          phone:Number(phone),
          active,
          room: { connect: { id: roomId } },
          bookingRoom: {
            create: rooms.map(roomDto => ({
              quantity: roomDto.quantity,
              total: roomDto.total,
              price: roomDto.price,
              unavailableDates: roomDto.unavailableDates,
              number: roomDto.number,
            })),
          },
        },
        include: {
          bookingRoom: true,
        },
      });

      return booking;
    } catch (error) {
      // Handle any errors that occur during creation
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  async getBookings() {
    try {
      // Get all bookings from the database
      const bookings = await this.prisma.booking.findMany({
        include: {
          bookingRoom: true,
          room: true,
          user: true,
        },
      });

      return bookings;
    } catch (error) {
      // Handle any errors that occur during retrieval
      throw new Error(`Failed to get bookings: ${error.message}`);
    }
  }
  async accessBooking(id: number,dto: updateBookingActiveDto) {
    try {
      // Access booking by id
      const booking = await this.prisma.booking.update({
        where: { id },
        data: { active: dto.active }
      });

      return booking;
    }catch(error) {
      throw new Error(`Failed to access booking: ${error.message}`);
    }
  }

  async getBookingByRoomIdAndActive(roomId:number) {
    try {
      // Get booking by id and active status
      const booking = await this.prisma.booking.findMany({
        where: {
            AND: [
              { roomId },
              { active: true }
            ]
         },
         include: {
          bookingRoom: true
         }
      });

      return booking;
    } catch (error) {
      throw new Error(`Failed to get booking: ${error.message}`);
    }
  }
}
