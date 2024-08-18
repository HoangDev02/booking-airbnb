import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GetBookingsDto, updateBookingActiveDto } from './dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService,
      private readonly email: EmailService
  ) {}

  async createBooking(userId: number,createBookingDto: CreateBookingDto) {
    const {  name, phone, active, rooms, roomId } = createBookingDto;
  
    try {
      // Fetch user and room information
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
  
      const room = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });
      if (!room) {
        throw new Error('Room not found');
      }
  
      // Create booking
      const booking = await this.prisma.booking.create({
        data: {
          user: { connect: { id: userId } },
          name,
          phone: Number(phone),
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
  
      // Calculate number of days
      const numberOfDays = rooms.reduce((totalDays, roomDto) => {
        const startDate = new Date(roomDto.unavailableDates[0]);
        const endDate = new Date(roomDto.unavailableDates[1]);
        const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        return totalDays + days;
      }, 0);
  
      await this.email.sendMail(
        user.email,  
        'Booking Confirmation',
        `Dear ${name},
        
        Thank you for your booking!
  
        Here are your booking details:
        - Room: ${room.title}
        - Check-in Date: ${rooms[0].unavailableDates[0]}  
        - Check-out Date: ${rooms[0].unavailableDates[1]}  
        - Number of Days: ${numberOfDays}
  
        We look forward to hosting you.
  
        Best regards,
        Your Hotel Team`,
      );
  
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

  async getBookingIdHotelInRoom(userId: number): Promise<GetBookingsDto[]> {
    const hotels = await this.prisma.hotel.findMany({
      where: { userId },
      include: {
        room: {
          include: {
            bookings: {
              include: {
                room: true,
              },
            },
          },
        },
      },
    });

    return hotels.map((hotel) => ({
      hotelId: hotel.id,
      hotelName: hotel.name,
      bookings: hotel.room.flatMap((room) => room.bookings.map((booking) => ({
        id: booking.id,
        name: booking.name,
        phone: booking.phone,
        active: booking.active,
        modifiedOn: booking.modifiedOn,
        room: {
          id: booking.room.id,
          title: booking.room.title,
          price: booking.room.price,
          maxPeople: booking.room.maxPeople,
          desc: booking.room.desc,
        },
      }))),
    }));
  }

  async getBookingByLeaveId(userId: number) {
    try {
      const booking = await this.prisma.booking.findMany({
        include: {
          room: {
            select: {
              hotel: {
                select: {
                  userId: true
                }
              }
            }
          },
          bookingRoom: true
        },
      });
      const leaveIdBooking = booking.filter((booking) => booking.room.hotel.userId === userId);
      
      return leaveIdBooking;
    }catch(error) {
      throw new Error(`Failed to get booking: ${error.message}`);
    }
  }
}
