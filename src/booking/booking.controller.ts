import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, GetBookingsDto, updateBookingActiveDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { getUser } from 'src/auth/decorator';


@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
    ) {}
    @UseGuards(JwtGuard)
    @Post('/create-booking')
    async createBooking(@getUser('id', ParseIntPipe) userId: number,  @Body() bookingData: CreateBookingDto) {
      return this.bookingService.createBooking(userId,bookingData);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Patch('access-booking/:id')
    async accessBooking(@Param('id', ParseIntPipe) id: number, @Body() dto: updateBookingActiveDto) {
      return this.bookingService.accessBooking(id,dto);
    }
    
    @Get()
    async getAllBooking() {
      return this.bookingService.getBookings();
    }
    @Get('find/active/:roomId')
    async getBookingByIdAndactive(@Param('roomId', ParseIntPipe) roomId: number) {
      return this.bookingService.getBookingByRoomIdAndActive(roomId);
    }
    
    @UseGuards(JwtGuard)
    @Get('user/bookings')
    async getBookingsByUserId(
      @getUser('id', ParseIntPipe) userId: number
    ): Promise<GetBookingsDto[]> {
      return this.bookingService.getBookingIdHotelInRoom(userId);
    }
    @Get('find/leave')
    @UseGuards(JwtGuard)
    async getBookingByleaveId(@getUser('id', ParseIntPipe) userId: number) {
      return this.bookingService.getBookingByLeaveId(userId);
    }
}
